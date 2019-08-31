// A function to calculate days by using moment.js
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




