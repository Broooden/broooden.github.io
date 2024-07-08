document.addEventListener("DOMContentLoaded", function() {
    const nameInput = document.getElementById("nameInput");
    const numbersInput = document.getElementById("numbersInput");
    const submitButton = document.getElementById("submitButton");
    const numberCountsContainer = document.getElementById("numberCounts");

    submitButton.addEventListener("click", function() {
        updatePage();
    });

    function updatePage() {
        const name = nameInput.value.trim();
        const numbers = numbersInput.value.split(',').map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num));

        if (numbers.length === 0) {
            alert("Please enter a valid list of numbers");
            return;
        }

        displayGreeting(name);
        const gridData = displayNumbers(numbers);
        displayNumberCounts(gridData);
    }

    function displayGreeting(name) {
        const greetingText = document.getElementById("greetingText");
        greetingText.textContent = "Hello, " + name;
    }

    function displayNumbers(numbers) {
        const table = document.getElementById("numberTable");
        table.innerHTML = ''; // Clear any existing rows

        // Initialize an array to store numbers for each row
        const rows = Array.from({ length: 8 }, () => []);

        // Calculate the ideal number of times each number should appear
        const totalCells = 8 * 5;
        const idealCount = Math.floor(totalCells / numbers.length);
        const extraCount = totalCells % numbers.length;

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

        // Fill rows with numbers ensuring no repeats in the same row
        for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
            const usedNumbers = new Set(); // Track used numbers in the current row
            for (let colIndex = 0; colIndex < 5; colIndex++) {
                let number;
                do {
                    if (distribution.length === 0) {
                        // If distribution array is unexpectedly empty, log error and break out
                        console.error("Distribution array unexpectedly empty.");
                        break;
                    }
                    number = distribution.pop(); // Get number from shuffled distribution
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

        // Return the generated grid data
        return rows;
    }

    function displayNumberCounts(gridData) {
        const counts = {};

        // Count occurrences of each number across all cells
        gridData.forEach(row => {
            row.forEach(num => {
                if (counts[num]) {
                    counts[num]++;
                } else {
                    counts[num] = 1;
                }
            });
        });

        // Create the text to display counts
        let countsText = "";
        Object.keys(counts).forEach(key => {
            countsText += `${key}: ${counts[key]}<br>`;
        });

        // Display counts below the table
        numberCountsContainer.innerHTML = countsText;
    }

    // Helper function to shuffle an array (Fisher-Yates shuffle)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});
