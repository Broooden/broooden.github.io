// script.js

document.addEventListener("DOMContentLoaded", function() {
    const nameInput = document.getElementById("nameInput");
    const maxNumberInput = document.getElementById("maxNumberInput");
    const submitButton = document.getElementById("submitButton");

    submitButton.addEventListener("click", function() {
        updatePage();
    });

    function updatePage() {
        const name = nameInput.value.trim();
        const maxNumber = parseInt(maxNumberInput.value, 10);

        if (isNaN(maxNumber) || maxNumber <= 0 || maxNumber > 100) {
            alert("Please enter a valid number between 1 and 100");
            return;
        }

        displayGreeting(name);
        displayNumbers(maxNumber);
    }

    function displayGreeting(name) {
        const greetingText = document.getElementById("greetingText");
        greetingText.textContent = "Hello, " + name;
    }

    function displayNumbers(maxNumber) {
        const table = document.getElementById("numberTable");
        table.innerHTML = ''; // Clear any existing rows
    
        // Create an array to store numbers for each row
        const rows = Array.from({ length: 8 }, () => []);
    
        // Fill rows with numbers ensuring no repeats in the same row
        for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
            const usedNumbers = new Set(); // Track used numbers in the current row
            for (let colIndex = 0; colIndex < 5; colIndex++) {
                let number;
                do {
                    number = Math.floor(Math.random() * maxNumber) + 1; // Random number between 1 and maxNumber
                } while (usedNumbers.has(number)); // Ensure number isn't already in the row
    
                rows[rowIndex].push(number);
                usedNumbers.add(number); // Add number to used set for current row
            }
        }
    
        // Create the table and fill it with numbers from the rows
        for (let i = 0; i < 8; i++) {
            const row = table.insertRow(i);
            for (let j = 0; j < 5; j++) {
                const cell = row.insertCell(j);
                cell.textContent = rows[i][j]; // Display number
            }
        }
    }
    
    

    
    

    
    
    // Helper function to shuffle an array (Fisher-Yates shuffle)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
});
