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

        // Initialize an array to store numbers for each row
        const rows = Array.from({ length: 8 }, () => []);

        // Function to fill half of the rows
        function fillHalf(startIndex, endIndex) {
            for (let rowIndex = startIndex; rowIndex < endIndex; rowIndex++) {
                const usedNumbers = new Set(); // Track used numbers in the current row
                for (let colIndex = 0; colIndex < 5; colIndex++) {
                    let number;
                    let attempts = 0;
                    do {
                        number = numbers[Math.floor(Math.random() * numbers.length)]; // Random number from the list
                        attempts++;
                    } while (usedNumbers.has(number) && attempts < 100); // Ensure number isn't already in the row

                    if (attempts >= 100) {
                        alert("Unable to generate a valid grid with the provided numbers. Please try a different set.");
                        return;
                    }

                    rows[rowIndex].push(number);
                    usedNumbers.add(number); // Add number to used set for current row

                    // Check for triple repeats and handle them
                    if (rowIndex >= 2 && rows[rowIndex - 1][colIndex] === number && rows[rowIndex - 2][colIndex] === number) {
                        // Remove the last number and try another one
                        rows[rowIndex].pop();
                        colIndex--;
                    }
                }
            }
        }

        // Fill the first half and second half of rows
        fillHalf(0, 4);
        fillHalf(4, 8);

        // Create the table and fill it with numbers from the rows
        for (let i = 0; i < 8; i++) {
            const row = table.insertRow(i);
            for (let j = 0; j < 5; j++) {
                const cell = row.insertCell(j);
                cell.textContent = rows[i][j]; // Display number
            }
        }
    }
});
