

"use strict"; // interpret document contents in JavaScript strict mode

/* global variables */
var photoOrder = [1, 2, 3, 4, 5];
var autoAdvance = setInterval(rightAdvance, 5000);
var figureCount = 3; 

/* Nina adds it */
var favList = [];

/* add src values to img elements based on order specified in photoOrder array */
function populateFigures() {
    var filename;
    var currentFig;
    if (figureCount === 3) {
        for (var i = 1; i < 4; i++) {
            filename = "images/IMG_0" + photoOrder[i] + "sm.jpg";
            currentFig = document.getElementsByTagName("img")[i - 1];
            currentFig.src = filename;
        }
    } else {
        for (var i = 0; i < 5; i++) {
            filename = "images/IMG_0" + photoOrder[i] + "sm.jpg";
            currentFig = document.getElementsByTagName("img")[i];
            currentFig.src = filename;
        }
    }
}

/* stop automatic image switching and call rightAdvance() function */
function rightArrow() {
    clearInterval(autoAdvance);
    rightAdvance();
}

/* shift all images one figure to the left, and change values in photoOrder array to match  */
function rightAdvance() {
    for (var i = 0; i < 5; i++) {
        if ((photoOrder[i] + 1) === 6) {
            photoOrder[i] = 1;
        } else {
            photoOrder[i] += 1;
        }
        populateFigures();
    }
}

/* shift all images one figure to the right, and change values in photoOrder array to match  */
function leftArrow() {
    clearInterval(autoAdvance);
    for (var i = 0; i < 5; i++) {
        if ((photoOrder[i] - 1) === 0) {
            photoOrder[i] = 5;
        } else {
            photoOrder[i] -= 1;
        }
        populateFigures();
    }
}

/* Nina adds it */
/* Add to favoritesList */
function addFavoriteList() {
    if (favList.length < 5) {
        if (favList.includes(zoomWindow.currentFig)) {
            alert("This picture is already in your favorite list");
        }
        else {
            favList.push(zoomWindow.currentFig);
        }
    }
    else {
        alert("Please remove at least one picutre before adding this one");
    }
    displayFavorites();
}
/* Nina adds it */
/* Display favoritesList */
function displayFavorites() {
    var favDiv = document.getElementById("favorites");
    favDiv.innerHTML = "<div style = 'margin: 5px'><p>Favorites: </p></div>";
    for (var i = 0; i < favList.length; i++) {
        var favFigure = document.createElement("div");
        favFigure.style = "display: inline-block; padding: 5px; text-align: center; padding-left: 1.5%";
        var favImgDiv = document.createElement("div");
        var favImage = document.createElement("img");
        favImage.width = "160";
        favImage.height = "90";
        favImage.src = "images/IMG_0" + favList[i] + ".jpg";
        favImgDiv.appendChild(favImage);
        favFigure.appendChild(favImgDiv);

        //create remove button under each favorite picture
        var removebtn = document.createElement("button");
        removebtn.innerHTML = "Remove";
        removebtn.value = i;
        removebtn.style = "margin: 5px;"
        removebtn.className = "btn btn-outline-light btn-sm";
        removebtn.addEventListener("click", removeFavorites, false);
        favFigure.appendChild(removebtn);
        favDiv.appendChild(favFigure);
    }
}

/* Nina adds it */
/* Remove favorite */
function removeFavorites() {
    var index = this.value;
    favList.splice(index, 1);
    displayFavorites();
}


/* switch to 5-image layout */
function previewFive() {
    var articleEl = document.getElementsByTagName("article")[0];
    // create figure and img elements for fifth image
    var lastFigure = document.createElement("figure");
    lastFigure.id = "fig5";
    lastFigure.style.zIndex = "5";
    lastFigure.style.position = "absolute";
    lastFigure.style.right = "45px";
    lastFigure.style.top = "67px";
    var lastImage = document.createElement("img");
    lastImage.width = "240";
    lastImage.height = "135";
    lastFigure.appendChild(lastImage);     //Syntax: node.appendChild(node)   add the lastImage to lastFigure!
    //   articleEl.appendChild(lastFigure);
    articleEl.insertBefore(lastFigure, document.getElementById("rightarrow"));   //Syntax: node.insertBefore(newnode, existingnode)

    //clone figure element for fifth image and edit to be first image
    var firstFigure = lastFigure.cloneNode(true); //Syntax: node.cloneNode(deep)  deep: Optional. Specifies whether all descendants of the node should be cloned.
    firstFigure.id = "fig1";
    firstFigure.style.right = "";
    firstFigure.style.left = "45px";
    articleEl.insertBefore(firstFigure, document.getElementById("fig2"));

    figureCount = 5;
    //change button to hide extra images
    var numberButton = document.querySelector("#fiveButton p");  //Syntax: document.querySelector(CSS selectors)
    numberButton.innerHTML = "Show fewer images";
    if (numberButton.addEventListener) {   //for different browsers
        numberButton.removeEventListener("click", previewFive, false);
        numberButton.addEventListener("click", previewThree, false);
    } else if (numberButton.attachEvent) {
        numberButton.detachEvent("onclick", previewFive);
        numberButton.attachEvent("onclick", previewThree);
    }

    // add appropriate src values to two new img elements
    document.getElementsByTagName("img")[0].src = "images/IMG_0" + photoOrder[0] + "sm.jpg";
    document.getElementsByTagName("img")[4].src = "images/IMG_0" + photoOrder[4] + "sm.jpg";
}

/* switch to 3-image layout */
function previewThree() {
    var articleEl = document.getElementsByTagName("article")[0];
    var numberButton = document.querySelector("#fiveButton p");
    figureCount = 3;
    articleEl.removeChild(document.getElementById("fig1"));
    articleEl.removeChild(document.getElementById("fig5"));
    numberButton.innerHTML = "Show more images";
    if (numberButton.addEventListener) {
        numberButton.removeEventListener("click", previewThree, false);
        numberButton.addEventListener("click", previewFive, false);
    } else if (numberButton.attachEvent) {
        numberButton.detachEvent("onclick", previewThree);
        numberButton.attachEvent("onclick", previewFive);
    }
}
var zoomWindow;
/* open center figure in separate window */
function zoomFig() {
    var propertyWidth = 960;
    var propertyHeight = 600;
    var winLeft = ((screen.width - propertyWidth) / 2);
    var winTop = ((screen.height - propertyHeight) / 2);
    var winOptions = "width=960,height=600";
    winOptions += ",left=" + winLeft;
    winOptions += ",top=" + winTop;
    zoomWindow = window.open("zoom.htm", "zoomwin", winOptions); //Syntax: window.open(url, windowName, [windowFeatures])
    zoomWindow.focus();
}


/* create event listeners for left arrow, right arrow, and center figure element */
function createEventListeners() {
    var leftarrow = document.getElementById("leftarrow");
    if (leftarrow.addEventListener) {
        leftarrow.addEventListener("click", leftArrow, false);
    } else if (leftarrow.attachEvent) {
        leftarrow.attachEvent("onclick", leftArrow);
    }

    var rightarrow = document.getElementById("rightarrow");
    if (rightarrow.addEventListener) {
        rightarrow.addEventListener("click", rightArrow, false);
    } else if (rightarrow.attachEvent) {
        rightarrow.attachEvent("onclick", rightArrow);
    }

    var mainFig = document.getElementsByTagName("img")[1];
    if (mainFig.addEventListener) {
        mainFig.addEventListener("click", zoomFig, false);
    } else if (mainFig.attachEvent) {
        mainFig.attachEvent("onclick", zoomFig);
    }

    var showAllButton = document.querySelector("#fiveButton p");
    if (showAllButton.addEventListener) {
        showAllButton.addEventListener("click", previewFive, false);
    } else if (showAllButton.attachEvent) {
        showAllButton.attachEvent("onclick", previewFive);
    }
}

/* create event listeners and populate image elements */
function setUpPage() {
    createEventListeners();
    populateFigures();
}

/* run setUpPage() function when page finishes loading */
if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}