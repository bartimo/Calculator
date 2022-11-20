const MAX_DIGIT_DISPLAY = 18;

const numButtons = document.querySelectorAll('.numButton');
const operandButtons = document.querySelectorAll('.operandButton');
const clearButton = document.getElementById('clearBtn');
const backButton = document.getElementById('backBtn');
const signButton = document.getElementById('signBtn');
const plusButton = document.getElementById('plusBtn');
const minusButton = document.getElementById('minusBtn');

clearButton.addEventListener('click', () => handleClearClick());
backButton.addEventListener('click', () => handleBackClick());
signButton.addEventListener('click', () => handleSignClick());
//plusButton.addEventListener('click', () => handlePlusClick());
//minusButton.addEventListener('click', () => handleMinusClick());
numButtons.forEach(btn => { 
    btn.addEventListener('click', () => handleNumClick(btn.textContent))
});
operandButtons.forEach(btn => { 
    btn.addEventListener('click', () => handleOperandClick(btn.textContent))
});


//Button Click Handlers
function handleNumClick(digit) {
    let displayBoxLength = document.querySelector('.displayBox').textContent.length;
    if(displayBoxLength <= MAX_DIGIT_DISPLAY) {
        document.querySelector('.displayBox').textContent += digit;
    }
}

function handleClearClick() {
    document.querySelector('.displayBox').textContent = '';
    document.querySelector('.memoryBox').textContent = '';
}

function handleBackClick() {
    displayBoxLength = document.querySelector('.displayBox').textContent.length;
    display = getDisplay();
    if(displayBoxLength > 0) {
        document.querySelector('.displayBox').textContent = display.slice(0,displayBoxLength-1);
    }
}

function handleSignClick() {
    display = getDisplay();
    document.querySelector('.displayBox').textContent = display * -1;
}

function handleOperandClick(operand) {
    display = getDisplay();
    memory = getMemory();

    if(display.length === 0 && memory.length === 0) {
        return;
    } else if (display.length === 0) {
        document.querySelector('.memoryBox').textContent = memory.slice(0,memory.length -1) + operand;
    } else {
        document.querySelector('.memoryBox').textContent = display + ` ${operand}`
        document.querySelector('.displayBox').textContent = '';
    }
}


//Helper Functions
function getDisplay() {
    return document.querySelector('.displayBox').textContent;
}

function getMemory() {
    return document.querySelector('.memoryBox').textContent;
}