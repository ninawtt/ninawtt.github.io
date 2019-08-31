/*    JavaScript 6th Edition
 *    Chapter 2
 *    Chapter case

 *    Fan Trick Fine Art Photography
 *    Variables and functions
 *    Author: 
 *    Date:   

 *    Filename: ft.js
 */

// global variables
var photographerCost = 0;
var totalCost = 0;
var memoryBook = false;
var reproductionRights = false;

// calculates all costs based on staff and adds to total cost
function calcStaff() {
   var num = document.getElementById("photognum");   //local variable
console.log("num: " + num);  //only shows in console area of browsers, only for developers for debugging
   var hrs = document.getElementById("photoghrs");
console.log("hrs: " + hrs);
   var distance = document.getElementById("distance");
console.log("distance: " + distance);
   totalCost -= photographerCost;
console.log("totalCost: " + totalCost);
   photographerCost = num.value * 100 * hrs.value + distance.value * num.value;
console.log("photographerCost: " + photographerCost);
   totalCost += photographerCost;
console.log("totalCost: " + totalCost);
   document.getElementById("estimate").innerHTML = "$" + totalCost;
}

// adds/subtracts cost of memory book from total cost
function toggleMembook() {
    //"===" means not only equal in values but also the same type
   (document.getElementById("membook").checked === false) ? totalCost -= 250 : totalCost += 250; //this is confusing, so if you aren't confident with this usage, don't use
   document.getElementById("estimate").innerHTML = "$" + totalCost;
}

// adds/subtracts cost of reproduction rights from total cost
function toggleRights() {
   (document.getElementById("reprodrights").checked === false) ? totalCost -= 1250 : totalCost += 1250;
   document.getElementById("estimate").innerHTML = "$" + totalCost;
}

// sets all form field values to defaults
function resetForm() {
   document.getElementById("photognum").value = 1;
   document.getElementById("photoghrs").value = 2;
   document.getElementById("membook").checked = memoryBook;
   document.getElementById("reprodrights").checked = reproductionRights;
   document.getElementById("distance").value = 0;
   calcStaff();
   createEventListeners();
}

// creates event listeners
function createEventListeners() {
   document.getElementById("photognum").addEventListener("change", calcStaff, false);
   document.getElementById("photoghrs").addEventListener("change", calcStaff, false);
   document.getElementById("membook").addEventListener("change", toggleMembook, false);
   document.getElementById("reprodrights").addEventListener("change", toggleRights, false);
   document.getElementById("distance").addEventListener("change", calcStaff, false);
}

// resets form when page is reloaded
// INSTRUCTOR NOTE: Code in Step 2 on p. 82 is incorrect; should be as follows:
window.addEventListener("load", resetForm, false);
//window is the global scope, technically, if you use document.getElementById, you should put window.document.getElementById, but everyone knows 
