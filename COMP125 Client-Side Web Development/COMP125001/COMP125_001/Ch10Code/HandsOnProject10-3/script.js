/*  JavaScript 6th Edition
    Chapter 10
    Hands-on Project 10-3

    Author: 
    Date:   

    Filename: script.js
*/

"use strict";
"use strict";
var waitForUser;

function geoTest() {
    waitForUser = setTimeout(fail, 10000);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(createMap, fail);
    } else {
        fail();
    }
}

function createMap(position) {
    clearTimeout(waitForUser);
    var Lat;
    var Lng;
    Lat = position.coords.latitude;
    Lng = position.coords.longitude;
    var mapOptions = {
        center: new google.maps.LatLng(Lat, Lng),
        zoom: 10
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function fail() {
    document.getElementById("map").innerHTML = "Unable to access your current location.";
}

