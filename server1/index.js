// Add event listeners to the buttons
document.getElementById("postButton").addEventListener("click", sendPOSTRequest);
document.getElementById("getButton").addEventListener("click", sendGETRequest);

function sendPOSTRequest() {
    var sqlQuery = document.getElementById("textInput").value.trim();
    sendRequest("POST", sqlQuery);
}

function sendGETRequest() {
    var sqlQuery = document.getElementById("textInput").value.trim();
    sendRequest("GET", sqlQuery);
}

function sendRequest(method, sqlQuery) {
    var xhr = new XMLHttpRequest();
    var url = method === "POST" ? "http://Server2URL:port/insert" : "http://Server2URL:port/select"; // Adjust the URL accordingly
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = xhr.responseText;
            console.log(response); // For demonstration, you might display this in a more user-friendly way on the page
        }
    };
    xhr.send(JSON.stringify({ sqlQuery: sqlQuery }));
}
