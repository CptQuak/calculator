function round(num, decimalPlaces = 0) {
    num = Math.round(num + "e" + decimalPlaces);
    return Number(num + "e" + -decimalPlaces);
}
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b == 0) {
        return "error";
    } else {
        return round(a / b, 3);
    }
}
function operate(operator, a, b) {
    newSect = true;
    switch (operator) {
        case "+":
            return add(a, b);
            break;
        case "-":
            return subtract(a, b);
            break;
        case "*":
            return multiply(a, b);
            break;
        case "/":
            return divide(a, b);
            break;
        default:
            return "error";
    }
}

function updateScreen(buttonValue) {
    //empty screen and dot pressed start wrigin float number
    if (buttonValue == "." && screen[0].textContent == 0) {
        screen[0].textContent = "0.";
    } //updating screen for float number that is starting with 0
    else if (
        screen[0].textContent[0] == "0" &&
        screen[0].textContent[1] == "."
    ) {
        screen[0].textContent += `${buttonValue}`;
    } //entering value greater than 0
    else if (screen[0].textContent == 0) {
        screen[0].textContent = buttonValue;
    } //updating screen with next numbers if first entered number is not 0
    else {
        screen[0].textContent += +`${buttonValue}`;
    }
    displayValue = screen[0].textContent;
}
//clears screen after entering operator button
function clearScreen(buttonValue) {
    if (buttonValue == "C") {
        resetCalculator();
    } else {
        hiddenValue = displayValue;
        currentOperator = buttonValue;
        screen[0].textContent = 0;
        displayValue = screen[0].textContent;
    }
}

function resetCalculator() {
    displayValue = 0;
    hiddenValue = 0;
    currentOperator = 0;
    screen[0].textContent = 0;
    wholeOperation = 0;
}
// console.log(operate("+", 2, 2));
// console.log(operate("-", 6, 3));
// console.log(operate("*", 2, 7));
// console.log(operate("/", 10, 3));
// console.log(operate("/", 2, 0));

let displayValue = 0;
let hiddenValue = 0;
let currentOperator = "";
let wholeOperation = 0;
let newSect = false;
const numericButtons = [];
const operatorButtons = [];
const actionButtons = [];
const screen = document.querySelectorAll(".screentext");
//segregating buttons for later use
const buttonHolder = document.querySelectorAll(".button");

buttonHolder.forEach((button) => {
    switch (button.textContent) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            numericButtons.push(button);
            break;
        case "+":
        case "*":
        case "/":
        case "-":
            // case "sqr":
            // case "%":
            operatorButtons.push(button);
            break;
        case "=":
        case "C":
        case ".":
            actionButtons.push(button);
            break;
    }
});
//on every numeric button click update screen value
numericButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        if (newSect) {
            newSect = false;
            screen[0].textContent = 0;
        }

        updateScreen(button.textContent);
        console.log(displayValue);
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (currentOperator == "") {
            wholeOperation = screen[0].textContent;
            displayValue = screen[0].textContent;
            currentOperator = button.textContent;
            newSect = true;
        } else if (!currentOperator == "") {
            currentOperator = button.textContent;
            if (newSect) {
                screen[0].textContent = operate(
                    currentOperator,
                    parseFloat(wholeOperation),
                    parseFloat(displayValue)
                );
                wholeOperation = screen[0].textContent;
            }
        }

        // if (currentOperator == "") {
        //     clearScreen(button.textContent);
        // } else {
        //     if (!newSect) {
        //         currentOperator = button.textContent;
        //         screen[0].textContent = operate(
        //             currentOperator,
        //             parseFloat(hiddenValue),
        //             parseFloat(displayValue)
        //         );
        //     }
        //     wholeOperation = screen[0].textContent;
        console.log("---------");
        console.log(displayValue);
        console.log(wholeOperation);
        console.log(currentOperator);
        // }
    });
});
//works for now
actionButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.textContent == "=" && !currentOperator == "") {
            screen[0].textContent = operate(
                currentOperator,
                parseFloat(wholeOperation),
                parseFloat(displayValue)
            );
            hiddenValue = screen[0].textContent;
        } else if (button.textContent == ".") {
            updateScreen(button.textContent);
        } else if (button.textContent == "C") {
            clearScreen(button.textContent);
        }
    });
});
