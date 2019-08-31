$(document).ready(function () {
    var MAX_INDEX = null, MIN_INDEX = 0;
    var timeoutId = null;
    var index = 0;
    var files = [];
    function changePic(picName) {
        $("#pic").attr("src", "images/" + picName);
        $("#picDiv").hide().fadeIn("slow");
    }
    function loadFile() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                files = JSON.parse(this.responseText).files;
                MAX_INDEX = files.length - 1;
                changePic(files[index]);
                startRotating(files[MIN_INDEX]);
            }
        };
        xhttp.open("GET", "file.html", true);
        xhttp.send();
    }
    function nextPic() {
        if (index < MAX_INDEX)
            index++;
        else
            index = MIN_INDEX;
        changePic(files[index]);
        startRotating(files[index]);
    }
    function previousPic() {
        if (index > MIN_INDEX)
            index--;
        else
            index = MAX_INDEX;
        changePic(files[index]);
        startRotating(files[index]);
    }
    function startRotating(fileName) {
        var interval = fileName.split("_")[1].replace(".jpg", "") * 1000;
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
            
        timeoutId = setTimeout(nextPic, interval)
    }
    function main() {
        loadFile();
    }

    main();

    $("#nextBtn").click(function () {
        nextPic();
    });
    $("#previousBtn").click(function () {
        previousPic();
    });
    $("#updateBtn").click(function () {
        index = 0;
        loadFile();
    });
});