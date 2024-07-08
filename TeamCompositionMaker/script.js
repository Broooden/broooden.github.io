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

        // Adjust the distribution to fill all cells without skipping any
        let distribution = numbers.slice(); // Copy numbers array
        while (distribution.length < totalCells) {
            distribution = distribution.concat(numbers);
        }
        distribution = distribution.slice(0, totalCells); // Trim excess numbers

        // Ensure no repeats in each row
        for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
            const usedNumbers = new Set();
            for (let colIndex = 0; colIndex < 5; colIndex++) {
                let number;
                do {
                    number = distribution.pop(); // Take a number from the distribution
                } while (usedNumbers.has(number)); // Ensure it's not already used in the row
                rows[rowIndex].push(number);
                usedNumbers.add(number); // Mark number as used in the row
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

        // Update number counts below the table
        updateNumberCounts(distribution.concat(...rows));
    }

    function updateNumberCounts(numbers) {
        const counts = {};

        // Count occurrences of each number
        numbers.forEach(num => {
            if (counts[num]) {
                counts[num]++;
            } else {
                counts[num] = 1;
            }
        });

        // Display counts below the table
        let countsText = "";
        Object.keys(counts).forEach(key => {
            countsText += `${key}: ${counts[key]}<br>`;
        });
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
