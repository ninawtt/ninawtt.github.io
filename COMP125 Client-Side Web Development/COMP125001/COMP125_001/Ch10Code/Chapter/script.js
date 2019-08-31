"use strict";
// declare global variables for setup page
var zIndexCounter;
var pos = [];
var origin;

// perform setup tasks when page first loads
function setUpPage() {
    document.querySelector("nav ul li:first-of-type").addEventListener("click", loadSetup, false);
    document.querySelector("nav ul li:last-of-type").addEventListener("click", loadDirections, false);
    var movableItems = document.querySelectorAll("#room div");
    zIndexCounter = movableItems.length + 1;
    for (var i = 0; i < movableItems.length; i++) {
        if (movableItems[i].addEventListener) {
            movableItems[i].addEventListener("mousedown", startDrag,
            false);
            movableItems[i].addEventListener("touchstart", startDrag, false);
        } else if (movableItems[i].attachEvent) {
            movableItems[i].attachEvent("onmousedown", startDrag);
        }
    }
}

// configure page to display Setup content
function loadSetup() {
    document.querySelector("nav ul li:first-of-type").className = "current";
    document.querySelector("nav ul li:last-of-type").className = "";
    document.getElementById("setup").style.display = "block";
    document.getElementById("location").style.display = "none";
    location.search = "";
}

// configure page to display Directions content
function loadDirections(string) {
    document.querySelector("nav ul li:first-of-type").className = "";
    document.querySelector("nav ul li:last-of-type").className = "current";
    document.getElementById("setup").style.display = "none";
    document.getElementById("location").style.display = "block";
}

// run setUpPage() function when page finishes loading
window.addEventListener("load", setUpPage, false);
// add event listeners and move object
// when user starts dragging
function startDrag(evt) {
    // set z-index to move selected element on top of others
    this.style.zIndex = zIndexCounter;
    // increment z-index counter so next selected element is
    // on top of others
    zIndexCounter++;
    if (evt.type !== "mousedown") {
        this.addEventListener("touchmove", moveDrag, false);
        this.addEventListener("touchend", removeTouchListener,
        false);
    } else {
        this.addEventListener("mousemove", moveDrag, false);
        this.addEventListener("mouseup", removeDragListener,
       false);
    }
    pos = [this.offsetLeft, this.offsetTop];
    origin = getCoords(evt);
}
// calculate new location of dragged object
function moveDrag(evt) {
    var currentPos = getCoords(evt);
    var deltaX = currentPos[0] - origin[0];
    var deltaY = currentPos[1] - origin[1];
    this.style.left = (pos[0] + deltaX) + "px";
    this.style.top = (pos[1] + deltaY) + "px";
}
// identify location of object
function getCoords(evt) {
    var coords = [];
    coords[0] = evt.clientX;
    coords[1] = evt.clientY;
    return coords;
}
// remove mouse event listeners when dragging ends
function removeDragListener() {
    // remove touch event listeners when dragging ends
    function removeTouchListener() {
        this.removeEventListener("touchmove", moveDrag, false);
        this.removeEventListener("touchend", removeTouchListener,
        false);
    }
    this.removeEventListener("mousemove", moveDrag, false);
    this.removeEventListener("mouseup", removeDragListener,
    false);
}
