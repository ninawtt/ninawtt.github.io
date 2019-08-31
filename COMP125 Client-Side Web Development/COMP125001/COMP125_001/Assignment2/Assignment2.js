
function generateTable() {
    var row = parseInt(document.getElementById("rows").value);
    var col = parseInt(document.getElementById("cols").value);
    var table = "<table><caption>" + row + " * " + col +" Table </caption>";
    for (var i = 1; i <= row; i++) {
        table += "<tr>";
        for (var j = 1; j <= col; j++) {
            table += "<td>" + i + "," + j + "</td>";
        }
        table += "</tr>"
    }
    document.getElementById("tableDiv").innerHTML = table + "</table>";
}

window.onload = generateTable();
