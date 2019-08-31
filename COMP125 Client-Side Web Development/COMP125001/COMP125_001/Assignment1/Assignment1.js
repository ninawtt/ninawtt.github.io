//global variables
var bmr = 0;

//calculate BMR
function calBMR() {
    var unit = document.getElementById("imperialHead").className;
    var gender = document.getElementsByName("gender");
    var age = document.getElementsByName("age");
    if (unit == "tablinksactive") {
        age = parseInt(age[0].value);
        var feet = parseInt(document.getElementById("feet").value);
        var inches = parseInt(document.getElementById("inches").value);
        var stones = parseInt(document.getElementById("stones").value);
        var pounds = parseInt(document.getElementById("pounds").value);
        var height = feet * 12 + inches; //1 feet = 12 inches
        var weight = stones * 14 + pounds; //1 stone = 14 pounds
        if (gender[0].value === "Female") {
            bmr = 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
        }
        else {
            bmr = 66 + (6.2 * weight) + (12.7 * height) - (6.76 * age);
        }
        document.getElementById("desc").innerHTML = "Calculation for a " + gender[0].value.toLowerCase() + " of " + age + " years with a height of " +
            feet + " feet " + inches + " inches and weight of " + stones + " stones " + pounds + " pounds."; 
    }
    else {
        age = parseInt(age[1].value);
        var weight = parseInt(document.getElementById("kg").value);
        var height = parseInt(document.getElementById("cm").value);
        if (gender[1].value === "Female") {
            bmr = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
        }
        else {
            bmr = 66.5 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
        }
        document.getElementById("desc").innerHTML = "Calculation for a " + gender[1].value.toLowerCase() + " of " + age + " years with a height of " +
            height + " cm and weight of " + weight + " kg."; 
    }
    bmr = bmr.toFixed(0);
    document.getElementById("bmr").innerHTML = bmr;
    calTEE();
    displayResult();
}

//calculate TEE
function calTEE() {
    var radios = document.getElementsByName("activityLv");
    var activityLv = "";
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked == true) {
            activityLv = radios[i].value;
            console.log(activityLv);
            break;
        }
    }
    switch (activityLv) {
        case "little": bmr *= 1.2; break;
        case "light": bmr *= 1.375; break;
        case "moderate": bmr *= 1.55; break;
        case "hard": bmr *= 1.725; break;
        default: bmr *= 1.9; break;
    }
    document.getElementById("tee").innerHTML = bmr.toFixed(0);
}

// sets all form field values to defaults
function resetForm() {
    //entry
    document.getElementsByName("gender")[0].value = "Female";
    document.getElementsByName("gender")[1].value = "Female";
    document.getElementsByName("age")[0].value = 0;
    document.getElementsByName("age")[1].value = 0;
    document.getElementById("feet").value = 0;
    document.getElementById("inches").value = 0;
    document.getElementById("stones").value = 0;
    document.getElementById("pounds").value = 0;
    document.getElementById("result").style.display = "none";
}

//change tab function
function chUnit(event, unitName) {
    //Declare all variables
    var i, tabcontent, tablinks;

    //Get all elements with class'"tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    //Get all elements with class="tablinksactive" and change to "tablinks"
    tablinks = document.getElementsByClassName("tablinksactive");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = "tablinks";
    }
    //Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(unitName).style.display = "block";
    event.currentTarget.className = "tablinksactive";
}

// Result
function displayResult() {
    var result = document.getElementById("result");
    result.style.display = "block";
}

window.addEventListener("load", resetForm, false);