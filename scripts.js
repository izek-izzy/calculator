function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    if (b === 0){
        return "Error: Division by zero";
    }
    return a / b;
}

function operate(operator ,a ,b) {
    switch(operator){
        case 'add' :
            return add(a,b);
            break;
        case 'subtract' :
            return subtract(a,b);
            break;
        case 'multiply' :
            return multiply(a,b);
            break;
        case 'divide' :
            return divide(a,b);
            default:
                return null;
                break;

    }
}

let displayValue = '0';
let firstOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

function updateDisplay(){
    const display =document.getElementById('display');
    display.innerText=displayValue;
}

function inputDigit(digit){
    if (shouldResetDisplay) {
        displayValue = digit;
        shouldResetDisplay = false;
    } else {
        displayValue = displayValue === '0' ?
        digit : displayValue + digit;
    }
    updateDisplay();
}

function inputDecimal(dot) {
    if (shouldResetDisplay) {
        displayValue = '0.';
        shouldResetDisplay = false;
        return
    }
    if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    currentOperator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function handleOperator(nextOperator) {
    if (firstOperand === null && !shouldResetDisplay) {
        firstOperand = parseFloat(displayValue);
    } else if (currentOperator) {
        const result = operate(currentOperator,firstOperand,parseFloat(displayValue));
        displayValue = result.toString();
        firstOperand = result;
    }
    currentOperator = nextOperator;
    shouldResetDisplay = true;
    updateDisplay();
}

function calculateResult(){
    if (currentOperator === null || shouldResetDisplay) return;
    const secondOperand = parseFloat(displayValue);
    const result = operate(currentOperator, firstOperand,secondOperand);
    displayValue = result.toString();
    firstOperand =null;
    currentOperator =null;
    shouldResetDisplay = true;
    updateDisplay();
    
}

const digitButtons = document.querySelectorAll('.btn:not(.operator)');
const operatorButtons = document.querySelectorAll('.btn.operator');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');
const backspaceButton = document.getElementById('backspace');

digitButtons.forEach(button => {
    button.addEventListener('click',() => {
        inputDigit(button.getAttribute('data-value'))
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click',() => {
        handleOperator(button.getAttribute('data-operator'))
    })
})

clearButton.addEventListener('click',clearDisplay);

equalsButton.addEventListener('click',calculateResult);

backspaceButton.addEventListener('click',backspace); 

function backspace() {
    if (displayValue.length > 1){
        displayValue = displayValue.slice(0, -1);
    }else {
        displayValue = '0';
    }
    updateDisplay();
}


