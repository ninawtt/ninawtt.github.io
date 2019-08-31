
function check() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;

    document.cookie = "username=" + encodeURIComponent(username);
    document.cookie = "email=" + encodeURIComponent(email);
    document.cookie = "address=" + encodeURIComponent(address);

    var cookieString = decodeURIComponent(document.cookie);
    var cookieArray = cookieString.split("; ");

    var currentUsername;
    var unBox = document.getElementById("username");
    for (var i = 0; i < cookieArray.length; i++) {
        currentUsername = cookieArray[i];
        if (currentUsername && currentUsername.substring(0, currentUsername.indexOf("=")) === "username") {
            unBox.value = currentUsername.substring(currentUsername.indexOf("=") + 1, currentUsername.length);
            break;
        }
    }

    var currentEmail;
    var emBox = document.getElementById("email");
    for (var i = 0; i < cookieArray.length; i++) {
        currentEmail = cookieArray[i];
        if (currentEmail && currentEmail.substring(0, currentEmail.indexOf("=")) === "email") {
            emBox.value = currentEmail.substring(currentEmail.indexOf("=") + 1, currentEmail.length);
            break;
        }
    }

    var currentAddress;
    var adBox = document.getElementById("address");
    for (var i = 0; i < cookieArray.length; i++) {
        currentAddress = cookieArray[i];
        if (currentAddress && currentAddress.substring(0, currentAddress.indexOf("=")) === "address") {
            adBox.value = currentAddress.substring(currentAddress.indexOf("=") + 1, currentAddress.length);
            break;
        }
    }

    alert(currentUsername + "\n" + currentEmail + "\n" + currentAddress);
}



