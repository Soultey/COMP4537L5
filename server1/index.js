// Get reference to the input field
const inputField = document.getElementById('textInput');

// Get reference to the buttons
const insertButton = document.getElementById('insertButton');
const postButton = document.getElementById('postButton');
const getButton = document.getElementById('getButton');

// Add event listener to the POST button
postButton.addEventListener('click', function() {
    // Perform functionality for POST button
    const inputValue = inputField.value;
    // Perform action with the input value
    console.log('POSTed value:', inputValue);
});

// Add event listener to the GET button
getButton.addEventListener('click', function() {
    // Perform functionality for GET button
    const inputValue = inputField.value;
    // Perform action with the input value
    console.log('GET value:', inputValue);
});
