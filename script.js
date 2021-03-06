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

    if (screen[0].textContent.length < 15) {
        if (buttonValue == "." && screen[0].textContent == "0") {
            screen[0].textContent += `${buttonValue}`;
        } else {
            if (screen[0].textContent != "0") {
                screen[0].textContent += `${buttonValue}`;
            }
            if (buttonValue != "0" && screen[0].textContent == "0") {
                screen[0].textContent = `${buttonValue}`;
            }
        }

        displayValue = screen[0].textContent;
    }
}

function updateState(operatorState) {
    wholeOperation = operate(
        currentOperator,
        parseFloat(wholeOperation),
        parseFloat(displayValue)
    );
    screen[0].textContent = wholeOperation;
    currentOperator = operatorState;
    displayValue = wholeOperation;
    if (Number.isInteger(displayValue)) displayFloat();
}

//clears screen after entering operator button
function clearScreen(buttonValue) {
    resetCalculator();
}

function resetCalculator() {
    displayValue = 0;
    hiddenValue = 0;
    currentOperator = 0;
    screen[0].textContent = 0;
    wholeOperation = 0;
    isDisplayFloat = false;
}

function displayFloat() {
    isDisplayFloat = !isDisplayFloat;
}

let isDisplayFloat = false;
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
        case "<-":
        case "+/-":
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
            currentOperator = button.textContent;
            newSect = true;
        } else if (currentOperator != button.textContent) {
            screen[0].textContent = wholeOperation;
            currentOperator = button.textContent;
        } else {
            updateState(button.textContent);
        }
        // console.log("---------");
        // console.log(displayValue);
        // console.log(wholeOperation);
        // console.log(currentOperator);
        // }
    });
});
//works for now
actionButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.textContent == "=" && !currentOperator == "") {
            updateState("");
        } else if (!isDisplayFloat && button.textContent == ".") {
            displayFloat();
            updateScreen(button.textContent);
        } else if (button.textContent == "C") {
            clearScreen(button.textContent);
        } else if (button.textContent == "<-") {
            console.log("---------");
            console.log(displayValue);
            console.log(wholeOperation);
            if (displayValue != 0) {
                if (displayValue < 10 && displayValue > -10) {
                    displayValue = 0;
                    screen[0].textContent = displayValue;
                } else {
                    displayValue = displayValue.substring(
                        0,
                        displayValue.length - 1
                    );
                    screen[0].textContent = displayValue;
                }
            }
        } else if (button.textContent == "+/-") {
            displayValue = displayValue * -1;
            screen[0].textContent = displayValue;
        }
    });
});
