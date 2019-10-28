
function projectSwitch(event, projectName) {
    //Declare all variables
    var projectTab, tablinks;

    //Get all elements with class'"projectTab" and hide them
    projectTab = document.getElementsByClassName("projectTab");
    for (var i = 0; i < projectTab.length; i++) {
        projectTab[i].style.display = "none";
    }

    //Get all elements with class="tablinksactive" and change to "tablinks"
    tablinks = document.getElementsByClassName("tablinksactive");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = "tablinks";
    }

    //Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(projectName).style.display = "block";
    event.currentTarget.className = "tablinksactive";

}