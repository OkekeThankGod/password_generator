
 // getting all the ids from the html
const characterAmountRange = document.getElementById('car');
const characterAmountNumber = document.getElementById('can');
const form = document.getElementById('passwordGeneratorForm');
const passwordDisplay = document.getElementById('passwordDisplay');
const includeUppercaseElement = document.getElementById('iuc');
const includeNumbersElement = document.getElementById('in');
const includeSymbolsElement = document.getElementById('is');

// These lines listen for user input and call syncCharacterAmount() whenever the user moves the slider or types a number.
// This ensures both inputs always show the same value.
characterAmountNumber.addEventListener('input', syncCharacterAmount);
characterAmountRange.addEventListener('input', syncCharacterAmount);


//These arrays store the ASCII character codes for different types of characters.
//arrayFromLowToHigh(65, 90) → Stores uppercase letters A-Z.
//arrayFromLowToHigh(97, 122) → Stores lowercase letters a-z.
//arrayFromLowToHigh(48, 57) → Stores numbers 0-9.
//arrayFromLowToHigh(33, 126) → Stores symbols.
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
    .concat(arrayFromLowToHigh(58, 64))
    .concat(arrayFromLowToHigh(91, 96))
    .concat(arrayFromLowToHigh(123, 126));


    //This listens for the form submission (when the button is clicked).
// e.preventDefault(); prevents the page from refreshing.
//It gets user options (password length, checkboxes).
// Calls generatePassword() and displays the password on the page.
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const characterAmount = characterAmountNumber.value;
    const includeUppercase = includeUppercaseElement.checked;
    const includeNumbers = includeNumbersElement.checked;
    const includeSymbols = includeSymbolsElement.checked;
    
    const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols);
    passwordDisplay.innerText = password;
});


//This function creates the random password based on user choices.
////It starts with lowercase letters.
///If checkboxes are checked, it adds more character types.
///A for loop picks random characters and adds them to the password.
///The final password is returned as a string.
function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
    let charCodes = [...LOWERCASE_CHAR_CODES]; // Default to lowercase letters
    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
    if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
    if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);

    const passwordCharacters = [];
    for (let i = 0; i < characterAmount; i++) {
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
        passwordCharacters.push(String.fromCharCode(characterCode));
    }
    
    return passwordCharacters.join('');
}


// The helper Function
// This function creates an array of character codes from low to high.
function arrayFromLowToHigh(low, high) {
    const array = [];
    for (let i = low; i <= high; i++) {
        array.push(i);
    }
    return array;
}

// This function updates both inputs so they stay synchronized.

function syncCharacterAmount(e) {
    const value = e.target.value;
    characterAmountNumber.value = value;
    characterAmountRange.value = value;
}


////Summary of the code and it functions
//User selects options (password length, uppercase, numbers, symbols).
//JavaScript listens for form submission.
//generatePassword() builds a random password.
//Password is displayed in <h3 id="passwordDisplay">.