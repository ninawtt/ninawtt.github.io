/*    JavaScript 6th Edition
 *    Chapter 5
 *    Chapter case

 *    Photo zoom
 *    Variables and functions
 *    Author: 
 *    Date:   

 *    Filename: zoom.js
 */

"use strict"; // interpret document contents in JavaScript strict mode

/* global variables */
var photoOrderArray = window.opener.photoOrder;  //access variables from the parent window
var figFilename = "images/IMG_0" + photoOrderArray[2] + ".jpg";
var currentFig = photoOrderArray[2];

/* populate img element and create event listener */
function pageSetup() {
   document.getElementsByTagName("img")[0].src = figFilename; // assign filename to img element
   createEventListener();
}

/* Nina adds it */
/* Add to favorite list*/
function addToFavoriteList() {
    window.opener.addFavoriteList();
    closeWin();
}



/* close window */
function closeWin() {
   window.close();
}

/* create event listener for close button */
function createEventListener() {
   var closeWindowDiv = document.getElementsByTagName("p")[0];
   if (closeWindowDiv.addEventListener) {
     closeWindowDiv.addEventListener("click", closeWin, false); 
   } else if (closeWindowDiv.attachEvent)  {
     closeWindowDiv.attachEvent("onclick", closeWin);
    }

    /* Nina adds it */
    var addFavoriteDiv = document.getElementsByTagName("p")[1];
    if (addFavoriteDiv.addEventListener) {
        addFavoriteDiv.addEventListener("click", addToFavoriteList, false);
    }
    else if (addFavoriteDiv.attachEvent) {
        addFavoriteDiv.attachEvent("onclick", addToFavoriteList);
    }
}

/* add img src value and create event listener when page finishes loading */
window.onload = pageSetup;