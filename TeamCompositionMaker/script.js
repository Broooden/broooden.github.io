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

        // Create an array with the numbers 1 to maxNumber
        const numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);

        // Calculate the ideal number of times each number should appear
        const totalCells = 8 * 5;
        const idealCount = Math.floor(totalCells / maxNumber);
        const extraCount = totalCells % maxNumber;

        // Create an array with the distribution of numbers
        const distribution = [];
        numbers.forEach(num => {
            for (let i = 0; i < idealCount; i++) {
                distribution.push(num);
            }
        });
        for (let i = 0; i < extraCount; i++) {
            distribution.push(numbers[i]);
        }

        // Shuffle the distribution array
        shuffleArray(distribution);

        // Initialize a 2D array to store numbers for each column
        const columns = Array.from({ length: 5 }, () => []);

        // Distribute the numbers into columns without repeating in the same column
        let colIndex = 0;
        distribution.forEach(num => {
            while (columns[colIndex].includes(num)) {
                colIndex = (colIndex + 1) % 5;
            }
            columns[colIndex].push(num);
            colIndex = (colIndex + 1) % 5;
        });

        // Create the table and fill it with numbers from the columns
        for (let i = 0; i < 8; i++) {
            const row = table.insertRow(i);
            for (let j = 0; j < 5; j++) {
                const cell = row.insertCell(j);
                cell.textContent = columns[j][i] || ''; // Handle empty cells gracefully
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
