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

        // Define the base URL
        var baseUrl = "https://comp4537.alterbotcreations.com/labs/5/api/sql";
    
        // For GET requests, append the sqlQuery as a query parameter in the URL
        var url = method === "GET" ? baseUrl + "?sqlQuery=" + encodeURIComponent(sqlQuery) : baseUrl;
    
        // Open the request with the specified method and URL (notice the URL changes for GET requests)
        xhr.open(method, url, true);

    // For POST requests, set the Content-Type header to specify JSON data
    if (method === "POST") {
        xhr.setRequestHeader("Content-Type", "application/json");

    }


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

    // For GET requests, send null instead of JSON data
    xhr.send(method === "GET" ? null : JSON.stringify({ sqlQuery: sqlQuery }));
}
