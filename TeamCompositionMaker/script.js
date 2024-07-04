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

        // Initialize an array to store numbers for each row
        const rows = Array.from({ length: rowCount }, () => []);

        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            const usedNumbers = new Set(); // Track used numbers in the current row
            for (let colIndex = 0; colIndex < colCount; colIndex++) {
                let number;
                do {
                    number = numbers[Math.floor(Math.random() * numbers.length)]; // Random number from the list
                } while (usedNumbers.has(number)); // Ensure number isn't already in the row

                rows[rowIndex].push(number);
                usedNumbers.add(number); // Add number to used set for current row
            }
        }

        // Create the table and fill it with numbers from the rows
        for (let i = 0; i < rowCount; i++) {
            const row = table.insertRow(i);
            for (let j = 0; j < colCount; j++) {
                const cell = row.insertCell(j);
                cell.textContent = rows[i][j]; // Display number
            }
        }
    }
});
