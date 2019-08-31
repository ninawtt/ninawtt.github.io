/*    JavaScript 6th Edition
 *    Chapter 6
 *    Hands-on Project 6-5

 *    Author: 
 *    Date:   

 *    Filename: script.js
 */

"use strict"; // interpret document contents in JavaScript strict mode

/* global variable */
var formValidity = true;

/* remove default value and formatting from selection list */
function removeSelectDefault() {
   var selectBox = document.getElementById("size");
   selectBox.selectedIndex = -1;
   selectBox.style.boxShadow = "none";
}

/* remove fallback placeholder text */
function zeroPlaceholder() {
   var instrBox = document.getElementById("instructions");
   instrBox.style.color = "black";
   if (instrBox.value === instrBox.placeholder) {
      instrBox.value = "";
   }
}

/* restore placeholder text if box contains no user entry */
function checkPlaceholder() {
   var instrBox = document.getElementById("instructions");
   if (instrBox.value === "") {
      instrBox.style.color = "rgb(178,184,183)";
      instrBox.value = instrBox.placeholder;
   }
}

/* add placeholder text for browsers that don't support placeholder attribute */
function generatePlaceholder() {
   if (!Modernizr.input.placeholder) {
      var instrBox = document.getElementById("instructions");
      instrBox.value = instrBox.placeholder;
      instrBox.style.color = "rgb(178,184,183)";
      if (instrBox.addEventListener) {
         instrBox.addEventListener("focus", zeroPlaceholder, false); 
         instrBox.addEventListener("blur", checkPlaceholder, false); 
      } else if (instrBox.attachEvent)  {
         instrBox.attachEvent("onfocus", zeroPlaceholder);
         instrBox.attachEvent("onblur", checkPlaceholder); 
      }
   }
}

/* validate required fields */
function validateRequired() {
   var inputElements = document.querySelectorAll("input[required]");
   var errorDiv = document.getElementById("errorMessage");
   var crustBoxes = document.getElementsByName("crust");
   var fieldsetValidity = true;
   var elementCount = inputElements.length;
   var currentElement;
   try {
      for (var i = 0; i < elementCount; i++) { 
         // validate all required input elements in fieldset
         currentElement = inputElements[i];
         if (currentElement.value === "") {
            currentElement.style.background = "rgb(255,233,233)";
            fieldsetValidity = false;
         } else {
            currentElement.style.background = "white";
         }
      }
      currentElement = document.querySelectorAll("select")[0]; 
      // validate state select element
      if (currentElement.selectedIndex === -1) {
         currentElement.style.border = "1px solid red";
         fieldsetValidity = false;
      } else {
         currentElement.style.border = "";
      }

      if (!crustBoxes[0].checked && !crustBoxes[1].checked) { 
         // verify that a crust is selected
         crustBoxes[0].style.outline = "1px solid red";
         crustBoxes[1].style.outline = "1px solid red";
         fieldsetValidity = false;
      } else {
         crustBoxes[0].style.outline = "";
         crustBoxes[1].style.outline = "";
      }

      if (fieldsetValidity === false) { 
           throw "Please complete all required fields.";
      } else {
         errorDiv.style.display = "none";
         errorDiv.innerHTML = "";
      }
   }
   catch(msg) {
      errorDiv.style.display = "block";
      errorDiv.innerHTML = msg; 
      formValidity = false;
   }
}

/* validate form */
function validateForm(evt) {
   if (evt.preventDefault) {
      evt.preventDefault(); // prevent form from submitting
   } else {
      evt.returnValue = false; // prevent form from submitting in IE8
   }
   formValidity = true; // reset value for revalidation
   validateRequired();
   if (formValidity === true) {
      document.getElementById("errorMessage").innerHTML = "";
      document.getElementById("errorMessage").style.display = "none";
      document.getElementsByTagName("form")[0].submit();
   } else {
      document.getElementById("errorMessage").innerHTML = "Please complete the highlighted fields.";
      document.getElementById("errorMessage").style.display = "block";
      scroll(0,0);
   }
} 

/* create event listeners  */
function createEventListeners() {
   var orderForm = document.getElementsByTagName("form")[0];
   if (orderForm.addEventListener) {
      orderForm.addEventListener("submit", validateForm, false);
   } else if (orderForm.attachEvent) {
      orderForm.attachEvent("onsubmit", validateForm);
   }
}

/* run initial form configuration functions */
function setUpPage() {
   removeSelectDefault();
   createEventListeners();
   generatePlaceholder();
}

/* run setup functions when page finishes loading */
if (window.addEventListener) {
   window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", setUpPage);
}