function displayGreeting() {
    // Get the value from the input box
    var name = document.getElementById("nameInput").value;

    // Display the greeting message
    var greetingText = document.getElementById("greetingText");
    greetingText.textContent = "Hello, " + name;
}
