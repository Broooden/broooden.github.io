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

        // Create a frequency map to track occurrences of each number
        const frequencyMap = new Map();
        numbers.forEach(num => frequencyMap.set(num, 0));

        // Function to get the least frequently used number not in the used set
        function getLeastFrequentNumber(usedNumbers) {
            let minFreq = Infinity;
            let minNum = null;

            frequencyMap.forEach((freq, num) => {
                if (freq < minFreq && !usedNumbers.has(num)) {
                    minFreq = freq;
                    minNum = num;
                }
            });

            return minNum;
        }

        // Fill rows with numbers ensuring no repeats in the same row and balanced distribution
        for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
            const usedNumbers = new Set(); // Track used numbers in the current row
            for (let colIndex = 0; colIndex < 5; colIndex++) {
                const number = getLeastFrequentNumber(usedNumbers);

                if (number === null) {
                    alert("Unable to generate a valid grid with the provided numbers. Please try a different set.");
                    return;
                }

                rows[rowIndex].push(number);
                usedNumbers.add(number);
                frequencyMap.set(number, frequencyMap.get(number) + 1); // Increment the frequency count
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
});
