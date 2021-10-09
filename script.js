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

// console.log(operate("+", 2, 2));
// console.log(operate("-", 6, 3));
// console.log(operate("*", 2, 7));
// console.log(operate("/", 10, 3));
// console.log(operate("/", 2, 0));

let displayValue = 0;
