// Function to display a greeting
function displayGreeting(name) {
    var greetingText = document.getElementById("greetingText");
    greetingText.textContent = "Hello, " + name;
}

// Function to update the page based on user input
function updatePage() {
    var name = document.getElementById("nameInput").value;
    var maxNumber = parseInt(document.getElementById("maxNumberInput").value);
    
    // Validate maxNumber input
    if (isNaN(maxNumber) || maxNumber <= 0 || maxNumber > 100) {
        alert("Please enter a valid number between 1 and 100");
        return;
    }

    displayGreeting(name);
    displayNumbers(maxNumber);
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
    shuffleArray(distribution);

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

// Helper function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Initialize the page with default values on load
document.addEventListener("DOMContentLoaded", function() {
    displayNumbers(11); // Initial default value
});
