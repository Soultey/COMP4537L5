// Add event listeners to the buttons
document.getElementById("postButton").addEventListener("click", sendPOSTRequest);
document.getElementById("getButton").addEventListener("click", sendGETRequest);

// Function to handle POST request
function sendPOSTRequest() {

    // Get the SQL query from the textarea and trim any leading/trailing whitespace
    var sqlQuery = document.getElementById("textInput").value.trim();

    // Call sendRequest function with method POST and the SQL query
    sendRequest("POST", sqlQuery);
}

// Function to handle GET request
function sendGETRequest() {

    // Get the SQL query from the textarea and trim any leading/trailing whitespace
    var sqlQuery = document.getElementById("textInput").value.trim();

    // Call sendRequest function with method GET and the SQL query
    sendRequest("GET", sqlQuery);
}

// Function to send HTTP request
function sendRequest(method, sqlQuery) {

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the URL based on the method (POST or GET)
    var url = method === "POST" ? "http://Server2URL:port/insert" : "http://Server2URL:port/select"; // Adjust the URL accordingly

    // Open the request with the specified method, URL, and asynchronous flag
    xhr.open(method, url, true);

    // Set the Content-Type header to specify JSON data
    xhr.setRequestHeader("Content-Type", "application/json");

    // Define a callback function to handle the response
    xhr.onreadystatechange = function () {

        // Check if the request is complete and the response is successful
        if (xhr.readyState === 4 && xhr.status === 200) {

            // Extract the response text
            var response = xhr.responseText;

            // Get the reference to the <div> with id "theBox"
            var theBox = document.getElementById("theBox");

            // Clear the existing content of the <div>
            theBox.innerHTML = '';

            // Create a new paragraph element to display the response
            var paragraph = document.createElement("p");
            // Set the text content of the paragraph to the response received from Server2
            paragraph.textContent = response;

            // Append the paragraph to the <div>
            theBox.appendChild(paragraph);
        }
    };
    // Send the request with the SQL query as JSON data
    xhr.send(JSON.stringify({ sqlQuery: sqlQuery }));
}
