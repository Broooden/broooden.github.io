document.addEventListener("DOMContentLoaded", function() {
    const nameInput = document.getElementById("nameInput");
    const numbersInput = document.getElementById("numbersInput");
    const submitButton = document.getElementById("submitButton");

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

        const rowCount = 8;
        const colCount = 5;
        const totalCells = rowCount * colCount;
        const numberCounts = {};

        // Initialize count for each number
        numbers.forEach(num => numberCounts[num] = 0);

        // Create an array of numbers with counts close to totalCells/numberOfNumbers
        let distribution = [];
        numbers.forEach(num => {
            let count = Math.floor(totalCells / numbers.length);
            for (let i = 0; i < count; i++) {
                distribution.push(num);
            }
        });

        // Fill the rest of the cells
        while (distribution.length < totalCells) {
            let num = numbers[Math.floor(Math.random() * numbers.length)];
            distribution.push(num);
        }

        // Shuffle the distribution array
        shuffleArray(distribution);

        // Create the table and fill it with numbers ensuring no repeats in rows
        for (let i = 0; i < rowCount; i++) {
            const row = table.insertRow(i);
            const usedNumbers = new Set();

            for (let j = 0; j < colCount; j++) {
                let cell = row.insertCell(j);
                let num;

                // Find a number that hasn't been used in this row
                do {
                    num = distribution.pop();
                } while (usedNumbers.has(num) && distribution.length > 0);

                cell.textContent = num;
                usedNumbers.add(num);
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
