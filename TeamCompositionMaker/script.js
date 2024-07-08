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
        displayNumbers(numbers);
        displayNumberCounts(numbers);
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

        // Fill rows with numbers ensuring no repeats in the same row
        for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
            const usedNumbers = new Set(); // Track used numbers in the current row
            for (let colIndex = 0; colIndex < 5; colIndex++) {
                let number;
                do {
                    number = numbers[Math.floor(Math.random() * numbers.length)]; // Random number from the list
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

    function displayNumberCounts(numbers) {
        const counts = {};

        // Count occurrences of each number
        numbers.forEach(num => {
            if (counts[num]) {
                counts[num]++;
            } else {
                counts[num] = 1;
            }
        });

        // Create the text to display counts
        let countsText = "";
        Object.keys(counts).forEach(key => {
            countsText += `${key}: ${counts[key]}<br>`;
        });

        // Display counts below the table
        numberCountsContainer.innerHTML = countsText;
    }
});
