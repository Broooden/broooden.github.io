<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Greeting Page</title>
    <style>
        table {
            border-collapse: collapse;
            width: 960px; /* Set the total width of the table */
        }

        table, th, td {
            border: 1px solid black;
        }

        th, td {
            width: 120px; /* Set the width of each cell */
            height: 120px;
            text-align: center;
        }
    </style>
</head>
<body>

    <h1>Greeting Page</h1>

    <label for="nameInput">Enter your name:</label>
    <input type="text" id="nameInput" placeholder="Type your name here">

    <label for="maxNumberInput">Enter the maximum number of players:</label>
    <input type="number" id="maxNumberInput" placeholder="Type a number" min="1" max="100">

    <button onclick="updatePage()">Submit</button>

    <p id="greetingText">Hello, ___</p>

    <table id="numberTable"></table>

    <script>
        // Function to display a greeting
        function displayGreeting() {
            // Get the value from the input box
            var name = document.getElementById("nameInput").value;

            // Display the greeting message
            var greetingText = document.getElementById("greetingText");
            greetingText.textContent = "Hello, " + name;
        }

        // Function to update the page based on user input
        function updatePage() {
            var name = document.getElementById("nameInput").value;
            var maxNumber = parseInt(document.getElementById("maxNumberInput").value);
            if (maxNumber > 0) {
                displayGreeting();
                displayNumbers(maxNumber);
            } else {
                alert("Please enter a valid number greater than 0");
            }
        }
    </script>

</body>
</html>
