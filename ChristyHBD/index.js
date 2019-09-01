// global variables
var changePicIntervalID;
var index = 0;
var files = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Change content function
function chContent(event, pageName) {
    // Declare all variables
    var tabContent, tabLinks;

    // Get all elements with classname "tabContent" and hide them
    tabContent = document.getElementsByClassName("tabContent");
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Get all elements with classname "tabLinkActive" and change classname to "tabLinks"
    tabLinks = document.getElementsByClassName("tabLinkActive");
    for (var i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = "tabLinks";
    }

    // Show the current tab, and change the classname to "tabLinkActive"
    document.getElementById(pageName).style.display = "block";
    event.currentTarget.className = "tabLinkActive";

    if(document.getElementById("gallery").style.display == "block") {
        if(changePicIntervalID != null) {
            clearInterval(changePicIntervalID);
        }
        changePicIntervalID = setInterval(nextPic, 3000);
    }

}
// A function to calculate days by using moment.js (Story Page)
function countDay() {
    // Set the meet date
    var meetDate = moment("2004-09-01", "YYYY-MM-DD");

    // Get todays date and time
    var now = moment();

    //  Time calculations for years, months, days, hours, minutes and seconds
    var years = now.diff(meetDate, "y");
    meetDate = meetDate.add(years, "y");
    var months = now.diff(meetDate, "M");
    meetDate = meetDate.add(months, "M");
    var days = now.diff(meetDate, "d");
    meetDate = meetDate.add(days, "d");
    var hours = now.diff(meetDate, "h");
    meetDate = meetDate.add(hours, "h");
    var minutes = now.diff(meetDate, "m");
    meetDate = meetDate.add(minutes, "m");
    var seconds = now.diff(meetDate, "s");
    meetDate = meetDate.add(seconds, "s");

    // Display the result in elements
    document.getElementById("years").innerHTML = years + "<br>" + "Y" + "</br>";
    document.getElementById("months").innerHTML = months + "<br>" + "M" + "</br>";
    document.getElementById("days").innerHTML = days + "<br>" + "D" + "</br>";
    document.getElementById("hours").innerHTML = hours + "<br>" + "H" + "</br>";
    document.getElementById("minutes").innerHTML = minutes + "<br>" + "M" + "</br>";
    document.getElementById("seconds").innerHTML = seconds + "<br>" + "S" + "</br>";

}
// Update the timer every 0.1 second
setInterval(countDay, 100);


/*--------------------------------Gallery Page--------------------------------------*/
// Gallery change pictures function
function changePic(index) {
    document.getElementById("pic").src = "images/bff" + files[index] + ".jpg";
    changeCircle(index);
}

function changeCircle(index) {
    for (var i = 0; i < files.length; i++) {
        if (i == index) {
            document.getElementById("index" + i).innerHTML = "●";
        }
        else {
            document.getElementById("index" + i).innerHTML = "○";
        }
    }
}

function nextPic() {
    if (index < files.length - 1) {
        index++;
    }
    else {
        index = 0;
    }
    changePic(index);
}

// Event handler for clicking the circle to change a picture
function clickToChangePic(i) {
    clearInterval(changePicIntervalID);
    changePicIntervalID = setInterval(nextPic, 3000);
    index = i;
    changePic(index);
}


/*--------------------------------Game Page--------------------------------------*/
function startGame() {
    resetGame();
    document.getElementById("gameRule").style.display = "none";
    document.getElementById("gameBox").style.display = "inline-block";
}

// one min counter function
var second = 60;  //one minute
function oneMinCounter() {
    // Display the result in elements
    document.getElementById("oneMinCounter").innerHTML = second;
    second --;

    if (second < 0) {
        document.getElementById("oneMinCounter").innerHTML = "Times Up!";
        document.getElementById("clockIcon").className = "fas fa-times-circle";
        clearInterval(oneMinCounterID);
        clearInterval(christyMoveID);
        christyImg.removeEventListener("click", getChristy, false);

    }
}
// Update the timer every 1 second
var oneMinCounterID = setInterval(oneMinCounter, 1000);


// variables for game page
var score = 0;
var speed = 3000;
var christyImgIndex = 0;
var christyImgNum = 4;
var christyImg = document.getElementById("christyRole");
// var monsterImgIndex = 0;
// var monsterImgNum = 2;
// var monsterImg = document.getElementById("monsterRole");
var bgWidth = 1030;
var bgHeight = 500;
var roleWidth = 118;
var roleHeight = 170;
// var bgWidth = Number(document.getElementById("gameBg").style.width);
// var bgHeight = Number(document.getElementById("gameBg").style.height);
// var roleWidth = Number(document.getElementById("christyRole").style.width);
// var roleHeight = Number(document.getElementById("christyRole").style.height);
var bgBoundryWidth = bgWidth - roleWidth;
var bgBoundryHeight = bgHeight - roleHeight;
var christyMoveID;
// var monsterMoveID;

window.onload = function start() {
    update();
    christyImg.addEventListener("click", getChristy, false);
    christyImg.style.left = "0px";
    christyImg.style.top = "0px";
    // monsterMoveID = setInterval(hopMonster, 5000);
}

function hopChristy() {
    changeChristyRolePic();
    resetRolePosition();
}
function changeChristyRolePic() {
    christyImgIndex++;
    if(christyImgIndex > christyImgNum - 1) {
        christyImgIndex = 0;
    }
    christyImg.src = "images/gameRole" + christyImgIndex + ".png";
}

function resetRolePosition() {
    christyImg.style.left = Math.random() * bgBoundryWidth + "px";
    christyImg.style.top = Math.random() * bgBoundryHeight + "px";

    christyImg.addEventListener("click", getChristy, false);
}

function getChristy() {
    score ++;
    
    document.getElementById("scoreband").innerHTML = score;
    clearInterval(christyMoveID);
    hopChristy();
    
    if (speed > 200) {
        speed -= 200;
    }
    christyMoveID = setInterval(resetRolePosition, speed);
    
}

// function hopMonster() {
//     changeMonsterPic();
//     resetMonsterPosition();
// }
// function changeMonsterPic() {
//     monsterImgIndex++;
//     if(monsterImgIndex > monsterImgNum - 1) {
//         monsterImgIndex = 0;
//     }
//     monsterImg.src = "images/gameMonster" + monsterImgIndex + ".png";
// }

// function resetMonsterPosition() {
//     monsterImg.style.left = Math.random() * bgBoundryWidth + "px";
//     monsterImg.style.top = Math.random() * bgBoundryHeight + "px";

//     monsterImg.addEventListener("click", getMonster, false);
// }
// function getMonster() {
//     score--;
    
//     document.getElementById("scoreband").innerHTML = score;
//     clearInterval(monsterMoveID);
//     hopMonster();

//     monsterMoveID = setInterval(hopMonster, speed);
// }


function update() {
    document.getElementById("scoreband").innerHTML = score;
    christyMoveID = setInterval(resetRolePosition, speed);
}



function resetGame() {
    clearInterval(oneMinCounterID);
    clearInterval(christyMoveID);
    document.getElementById("oneMinCounter").innerHTML = "60";
    second = 60;
    document.getElementById("clockIcon").className = "fas fa-clock";
    oneMinCounterID = setInterval(oneMinCounter, 1000);
    score = 0;
    speed = 3000;
    update();
}

function backToGameRule() {
    document.getElementById("gameRule").style.display = "block";
    document.getElementById("gameBox").style.display = "none";
    resetGame();
}