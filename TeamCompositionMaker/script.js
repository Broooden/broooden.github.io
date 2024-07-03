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

        .input-container {
            margin-bottom: 10px;
        }

        .input-container label {
            display: block;
            margin-bottom: 5px;
        }

        .input-container input {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
        }

        button {
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
        }

        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>

    <div id="greetingPage">
        <h1>Greeting Page</h1>

        <div class="input-container">
            <label for="nameInput">Enter your name:</label>
            <input type="text" id="nameInput" placeholder="Type your name here">
        </div>

        <div class="input-container">
            <label for="maxNumberInput">Enter the maximum number of players:</label>
            <input type="number" id="maxNumberInput" placeholder="Type a number" min="1" max="100">
        </div>

        <button onclick="updatePage()">Submit</button>

        <p id="greetingText">Hello, ___</p>

        <table id="numberTable"></table>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            // Initial call to display the table with default max number (11)
            displayNumbers(11);
        });

        // Function to display a greeting
        function displayGreeting(name) {
            var greetingText = document.getElementById("greetingText");
            greetingText.textContent = "Hello, " + name;
        }

        // Function to update the page based on user input
        function updatePage() {
            var name = document.getElementById("nameInput").value;
            var maxNumber = parseInt(document.getElementById("maxNumberInput").value);
            if (maxNumber > 0) {
                displayGreeting(name);
                displayNumbers(maxNumber);
            } else {
                alert("Please enter a valid number greater than 0");
            }
        }

        // Function to display a 5 by 8 table with unique random numbers
        function displayNumbers(maxNumber) {
            var table = document.getElementById("numberTable");
            table.innerHTML = ''; // Clear any existing rows

            // Create an array with the numbers 1 to maxNumber
            var numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);

            // Calculate the ideal number of times each number should appear
            var totalCells = 8 * 5;
            var idealCount = Math.floor(totalCells / maxNumber);
            var extraCount = totalCells % maxNumber;

            // Create an array with the distribution of numbers
            var distribution = [];
            numbers.forEach(num => {
                for (var i = 0; i < idealCount; i++) {
                    distribution.push(num);
                }
            });
            for (var i = 0; i < extraCount; i++) {
                distribution.push(numbers[i]);
            }

            // Shuffle the distribution array
            distribution.sort(() => Math.random() - 0.5);

            // Initialize a 2D array to store numbers for each column
            var columns = Array.from({ length: 5 }, () => []);

            // Distribute the numbers into columns without repeating in the same column
            var colIndex = 0;
            for (var i = 0; i < distribution.length; i++) {
                while (columns[colIndex].includes(distribution[i])) {
                    colIndex = (colIndex + 1) % 5;
                }
                columns[colIndex].push(distribution[i]);
                colIndex = (colIndex + 1) % 5;
            }

            // Create the table and fill it with numbers from the columns
            for (var i = 0; i < 8; i++) {
                var row = table.insertRow(i);
                for (var j = 0; j < 5; j++) {
                    var cell = row.insertCell(j);
                    cell.textContent = columns[j][i] || ''; // Handle empty cells gracefully
                }
            }
        }
    </script>

</body>
</html>
