/* global variables */
var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var address = document.getElementById("address");
var city = document.getElementById("city");
var code = document.getElementById("code");
var province = document.getElementById("province");
var age = document.getElementById("age");
var psw = document.getElementById("psw");
var confirmpsw = document.getElementById("confirmpsw");
var email = document.getElementById("email");

function resetForm() {
    document.getElementById("form").reset();
    resetErr();
}

function resetErr() {
    for (var i = 0; i < 10; i++) {
        document.getElementsByClassName("errStar")[i].innerHTML = "";
        document.getElementsByClassName("errDt")[i].innerHTML = "";
    }
}

function validateForm() {
    resetErr();
    var pass = true;
    var postalCodeRegex = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/.test(code.value.toUpperCase());
    var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(email.value);
    if (fname.value == "") {
        document.getElementsByClassName("errStar")[0].innerHTML = "*";
        document.getElementsByClassName("errDt")[0].innerHTML = "Please enter first name";
        pass = false;
    }
    if (lname.value == "") {
        document.getElementsByClassName("errStar")[1].innerHTML = "*";
        document.getElementsByClassName("errDt")[1].innerHTML = "Please enter last name";
        pass = false;
    }
    if (address.value == "") {
        document.getElementsByClassName("errStar")[2].innerHTML = "*";
        document.getElementsByClassName("errDt")[2].innerHTML = "Please enter address";
        pass = false;
    }
    if (city.value == "") {
        document.getElementsByClassName("errStar")[3].innerHTML = "*";
        document.getElementsByClassName("errDt")[3].innerHTML = "Please enter city";
        pass = false;
    }
    if (code.value.toUpperCase() == "") {
        document.getElementsByClassName("errStar")[4].innerHTML = "*";
        document.getElementsByClassName("errDt")[4].innerHTML = "Please enter postal code";
        pass = false;
    }
    else {
        if (postalCodeRegex == false) {
            document.getElementsByClassName("errStar")[4].innerHTML = "*";
            document.getElementsByClassName("errDt")[4].innerHTML = "Invalid postal code";
            pass = false;
        }
    }
    
    if (province.value == "") {
        document.getElementsByClassName("errStar")[5].innerHTML = "*";
        document.getElementsByClassName("errDt")[5].innerHTML = "Please select province";
        pass = false;
    }
    if (age.value == "") {
        document.getElementsByClassName("errStar")[6].innerHTML = "*";
        document.getElementsByClassName("errDt")[6].innerHTML = "Please enter age";
    }
    else {
        if (age.value < 18) {
            document.getElementsByClassName("errStar")[6].innerHTML = "*";
            document.getElementsByClassName("errDt")[6].innerHTML = "Not eligible";
            pass = false;
        }
    }
    if (psw.value == "") {
        document.getElementsByClassName("errStar")[7].innerHTML = "*";
        document.getElementsByClassName("errDt")[7].innerHTML = "Please enter password";
        pass = false;
    }
    else {
        if (psw.value.length < 6) {
            document.getElementsByClassName("errStar")[7].innerHTML = "*";
            document.getElementsByClassName("errDt")[7].innerHTML = "At least 6 characters";
            pass = false;
        }
    }
    if (confirmpsw.value == "") {
        document.getElementsByClassName("errStar")[8].innerHTML = "*";
        document.getElementsByClassName("errDt")[8].innerHTML = "Please confirm password";
        pass = false;
    }
    else {
        if (psw.value != confirmpsw.value) {
            document.getElementsByClassName("errStar")[8].innerHTML = "*";
            document.getElementsByClassName("errDt")[8].innerHTML = "Passwords do not match";
            pass = false;
        }
    }
    if (email.value == "") {
        document.getElementsByClassName("errStar")[9].innerHTML = "*";
        document.getElementsByClassName("errDt")[9].innerHTML = "Please enter email";
        pass = false;
    }
    else {
        if (emailRegex == false) {
            document.getElementsByClassName("errStar")[9].innerHTML = "*";
            document.getElementsByClassName("errDt")[9].innerHTML = "Invalid email";
            pass = false;
        }
    }
    if (pass) {
        accountCreated();
    }
}

function accountCreated() {
    document.getElementById("formDiv").style.display = "none";
    document.getElementsByClassName("info")[0].innerHTML = fname.value;
    document.getElementsByClassName("info")[1].innerHTML = lname.value;
    document.getElementsByClassName("info")[2].innerHTML = address.value + " " + city.value + " " + code.value + " "   + province.value;
    document.getElementsByClassName("info")[3].innerHTML = age.value;
    document.getElementsByClassName("info")[4].innerHTML = email.value;
    document.getElementById("accountDiv").style = "display: block!important";
}

//function memberAccountCreated() {
//    window.open("MemberAccount.html", "Member Account Created", "_self");
//    //window.location.replace("MemberAccount.html");  //open the MemberAccount page in the same window
//}

function createEventListener() {
    var submitBtn = document.getElementById("submitBtn");
    if (submitBtn.addEventListener) {
        submitBtn.addEventListener("click", validateForm, false);
    }
    else if (submitBtn.addEventListener) {
        submitBtn.addEventListener("onclick", validateForm);
    }

    var clearBtn = document.getElementById("clearBtn");
    if (clearBtn.addEventListener) {
        clearBtn.addEventListener("click", resetForm, false);
    }
    else if (clearBtn.addEventListener) {
        clearBtn.addEventListener("onclick", resetForm);
    }
}

function setUpPage() {
    createEventListener();
}

/* run setUpPage() function when page finishes loading */
if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}

