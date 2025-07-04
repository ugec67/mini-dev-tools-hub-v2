// --- Timer Functionality ---
// Get references to all necessary HTML elements for the timer
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const startTimerBtn = document.getElementById('startTimer');
const pauseTimerBtn = document.getElementById('pauseTimer');
const resetTimerBtn = document.getElementById('resetTimer');
const countdownDisplay = document.getElementById('countdown');

let timerInterval; // Variable to hold the setInterval ID
let timeLeft = 0; // Stores the remaining time in seconds
let isPaused = false; // Flag to check if the timer is paused

/**
 * Formats a given number of seconds into a "MM:SS" string.
 * @param {number} seconds - The total number of seconds.
 * @returns {string} Formatted time string (e.g., "05:30").
 */
function formatTime(seconds) {
    const min = Math.floor(seconds / 60); // Calculate minutes
    const sec = seconds % 60; // Calculate remaining seconds
    // Pad with leading zeros if necessary
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

/**
 * Starts or resumes the timer countdown.
 */
function startTimer() {
    // Clear any existing timer interval to prevent multiple timers running
    if (timerInterval) clearInterval(timerInterval);

    // If not paused, get new time from inputs
    if (!isPaused) {
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        
        // Basic input validation for time values
        if (minutes < 0 || seconds < 0 || seconds > 59) {
            alert("Please enter valid time values (minutes >= 0, seconds 0-59).");
            return;
        }
        timeLeft = (minutes * 60) + seconds; // Convert total time to seconds
    }

    // If no time is set, alert the user and stop
    if (timeLeft <= 0) {
        countdownDisplay.textContent = "00:00";
        alert("Please set a valid time to start the timer!");
        return;
    }

    isPaused = false; // Set paused flag to false
    // Start the countdown interval
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            // If time runs out, clear interval, reset display, and alert
            clearInterval(timerInterval);
            countdownDisplay.textContent = "00:00";
            alert("Time's up!");
            return;
        }
        timeLeft--; // Decrement time
        countdownDisplay.textContent = formatTime(timeLeft); // Update display
    }, 1000); // Run every 1 second (1000 milliseconds)
}

/**
 * Pauses the timer countdown.
 */
function pauseTimer() {
    clearInterval(timerInterval); // Stop the interval
    isPaused = true; // Set paused flag to true
}

/**
 * Resets the timer to its initial state.
 */
function resetTimer() {
    clearInterval(timerInterval); // Stop the interval
    timeLeft = 0; // Reset time
    isPaused = false; // Reset paused flag
    countdownDisplay.textContent = "00:00"; // Reset display
    minutesInput.value = ''; // Clear input fields
    secondsInput.value = '';
}

// Add event listeners to timer buttons
startTimerBtn.addEventListener('click', startTimer);
pauseTimerBtn.addEventListener('click', pauseTimer);
resetTimerBtn.addEventListener('click', resetTimer);

// --- Currency Converter Functionality ---
const amountInput = document.getElementById('amountInput');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const convertCurrencyBtn = document.getElementById('convertCurrencyBtn');
const currencyResultDisplay = document.getElementById('currencyResult');

// Exchange rates (simplified and static for demonstration purposes)
// In a real application, you would fetch these from a reliable API.
const exchangeRates = {
    "USD": { "EUR": 0.92, "GBP": 0.79, "JPY": 156.80, "INR": 83.50, "USD": 1 },
    "EUR": { "USD": 1.08, "GBP": 0.86, "JPY": 170.10, "INR": 90.50, "EUR": 1 },
    "GBP": { "USD": 1.27, "EUR": 1.16, "JPY": 198.00, "INR": 106.00, "GBP": 1 },
    "JPY": { "USD": 0.0064, "EUR": 0.0059, "GBP": 0.0051, "INR": 0.53, "JPY": 1 },
    "INR": { "USD": 0.012, "EUR": 0.011, "GBP": 0.0094, "JPY": 1.88, "INR": 1 }
};

/**
 * Converts currency based on input amount and selected currencies.
 */
function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount to convert.");
        currencyResultDisplay.textContent = "";
        return;
    }

    if (fromCurrency === toCurrency) {
        currencyResultDisplay.textContent = `${amount.toFixed(2)} ${toCurrency}`;
        return;
    }

    const rate = exchangeRates[fromCurrency][toCurrency];
    if (rate) {
        const convertedAmount = amount * rate;
        currencyResultDisplay.textContent = `${amount.toFixed(2)} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } else {
        currencyResultDisplay.textContent = "Conversion rate not available.";
    }
}

convertCurrencyBtn.addEventListener('click', convertCurrency);
// Initial conversion on load
convertCurrency(); // Call once on page load to show default conversion

// --- Age Calculator Functionality ---
const birthDateInput = document.getElementById('birthDateInput');
const calculateAgeBtn = document.getElementById('calculateAgeBtn');
const ageResultDisplay = document.getElementById('ageResult');

/**
 * Calculates the age based on the provided birth date.
 */
function calculateAge() {
    const birthDateStr = birthDateInput.value;
    if (!birthDateStr) {
        alert("Please select your birth date.");
        ageResultDisplay.textContent = "";
        return;
    }

    const birthDate = new Date(birthDateStr);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Adjust for negative months or days
    if (days < 0) {
        months--;
        // Get the number of days in the previous month of today's date
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    ageResultDisplay.textContent = `You are ${years} years, ${months} months, and ${days} days old.`;
}

calculateAgeBtn.addEventListener('click', calculateAge);

// --- Password Generator Functionality ---
// Get references to password generator elements
const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const passwordLength = document.getElementById('passwordLength');
const generatePasswordBtn = document.getElementById('generatePassword');
const generatedPasswordInput = document.getElementById('generatedPassword');
const copyPasswordBtn = document.getElementById('copyPassword');

// Define character sets for password generation
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

/**
 * Generates a random password based on selected options and length.
 */
generatePasswordBtn.addEventListener('click', () => {
    let characters = ""; // String to store all selected character types
    if (includeUppercase.checked) characters += uppercaseChars;
    if (includeLowercase.checked) characters += lowercaseChars;
    if (includeNumbers.checked) characters += numberChars;
    if (includeSymbols.checked) characters += symbolChars;

    const length = parseInt(passwordLength.value); // Get desired password length

    // Validate if any character type is selected
    if (characters.length === 0) {
        alert("Please select at least one character type (Uppercase, Lowercase, Numbers, or Symbols).");
        return;
    }
    // Validate password length
    if (length < 4 || length > 64) {
        alert("Password length must be between 4 and 64 characters.");
        return;
    }

    let password = "";
    // Generate password by randomly picking characters from the combined set
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    generatedPasswordInput.value = password; // Display the generated password
});

/**
 * Copies the generated password to the clipboard.
 */
copyPasswordBtn.addEventListener('click', () => {
    generatedPasswordInput.select(); // Select the text in the input field
    generatedPasswordInput.setSelectionRange(0, 99999); // For mobile devices to select all text

    // Use modern Clipboard API if available (preferred for HTTPS contexts)
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(generatedPasswordInput.value)
            .then(() => {
                alert("Password copied to clipboard!");
            })
            .catch(err => {
                console.error("Failed to copy password using Clipboard API: ", err);
                alert("Failed to copy password. Please copy manually.");
            });
    } else {
        // Fallback for older browsers using document.execCommand (deprecated but widely supported)
        try {
            document.execCommand("copy");
            alert("Password copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy password using execCommand: ", err);
            alert("Failed to copy password. Please copy manually.");
        }
    }
});
