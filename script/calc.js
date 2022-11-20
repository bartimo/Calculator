const MAX_DIGIT_DISPLAY = 18;

const numButtons = document.querySelectorAll('.numButton');
const operandButtons = document.querySelectorAll('.operandButton');
const clearButton = document.getElementById('clearBtn');
const backButton = document.getElementById('backBtn');
const signButton = document.getElementById('signBtn');
const plusButton = document.getElementById('plusBtn');
const minusButton = document.getElementById('minusBtn');
const equalButton = document.getElementById('equalBtn');
const decimalButton = document.getElementById('decimalBtn');
let newEquation = false;

clearButton.addEventListener('click', () => handleClearClick());
backButton.addEventListener('click', () => handleBackClick());
signButton.addEventListener('click', () => handleSignClick());
equalButton.addEventListener('click', () => handleEqualClick(true));
decimalButton.addEventListener('click', () => handleDecimalClick());

numButtons.forEach(btn => { 
    btn.addEventListener('click', () => handleNumClick(btn.textContent))
});
operandButtons.forEach(btn => { 
    btn.addEventListener('click', () => handleOperandClick(btn.textContent))
});


//Button Click Handlers
function handleNumClick(digit) {
    const calc = loadCalculator();
    if(calc.display.slice(0,4) == "Err:") {
        handleClearClick()
    } 
    
    if(newEquation) {
        handleClearClick();
        newEquation = false;
    }

    if(calc.display.length <= MAX_DIGIT_DISPLAY) {
        document.querySelector('.displayBox').textContent += digit;
    }
}

function handleEqualClick(fromButton) {
    const calc = loadCalculator();
    if (fromButton) {
        newEquation = true;
    }
    
    if(calc.display.slice(0,4) == "Err:") {
        handleClearClick()
        return;
    } 

    if(calc.display.length === 0 || calc.memory.length === 0) {
        return
    }
    switch (calc.operand) {
        case '+':
            document.querySelector('.displayBox').textContent = +calc.memory + +calc.display;
            document.querySelector('.memoryBox').textContent = '';
            
        break;

        case '-':
            document.querySelector('.displayBox').textContent = +calc.memory - +calc.display;
            document.querySelector('.memoryBox').textContent = '';
        break;

        case 'x':
            document.querySelector('.displayBox').textContent = +calc.memory * +calc.display;
            document.querySelector('.memoryBox').textContent = '';
        break;

        case '/':
            if(calc.display == 0) {
                document.querySelector('.displayBox').textContent = "Err: Divide be zero"
                document.querySelector('.memoryBox').textContent = '';
                break;
            } 
            
            document.querySelector('.displayBox').textContent = +calc.memory / +calc.display;
            document.querySelector('.memoryBox').textContent = '';
        break;    
    } 
}

function handleClearClick() {
    document.querySelector('.displayBox').textContent = '';
    document.querySelector('.memoryBox').textContent = '';
}

function handleBackClick() {
    calc = loadCalculator();
    if(calc.display.length > 0) {
        document.querySelector('.displayBox').textContent = calc.display.slice(0,calc.display.length-1);
    }
}

function handleSignClick() {
    calc = loadCalculator();
    document.querySelector('.displayBox').textContent = calc.display * -1;
}

function handleOperandClick(operand) {
    let calc = loadCalculator();
    newEquation = false;
    if(calc.operand == '/' && calc.display == 0) {
        document.querySelector('.displayBox').textContent = "Err: Divide be zero"
        document.querySelector('.memoryBox').textContent = '';
        return;
    }

    if(calc.display.slice(0,4) === "Err:") {
        handleClearClick();
        return;
    }

    if(calc.display.length === 0 && calc.memory.length === 0) {
        return;
    } else if (calc.display.length === 0) {
        document.querySelector('.memoryBox').textContent = calc.memory + operand;
    } else if (calc.display.length !== 0 && calc.memory.length !== 0) {
        //document.querySelector('.memoryBox').textContent = calc.display + ` ${operand}`
        handleEqualClick(false);
        calc = loadCalculator();
        document.querySelector('.memoryBox').textContent = calc.display + ` ${operand}`
        document.querySelector('.displayBox').textContent = '';
        //handleOperandClick(operand);
    } else{
        document.querySelector('.memoryBox').textContent = calc.display + ` ${operand}`
        document.querySelector('.displayBox').textContent = '';;
    }
}

function handleDecimalClick() {
    calc = loadCalculator();

    if(newEquation) {
        handleClearClick();
        newEquation = false;
    }

    if(calc.display.slice(0,4) == "Err:") {
        handleClearClick()
    } 

    if(calc.display.includes('.')) {
        return;
    } else {
        document.querySelector('.displayBox').textContent += '.';
    }
}


//Helper Functions
function getDisplay() {
    return document.querySelector('.displayBox').textContent;
}


function getMemory() {
    const memory = document.querySelector('.memoryBox').textContent;
    return memory.slice(0,memory.length-1);
}

function getOperand() {
    const memory = document.querySelector('.memoryBox').textContent
    return document.querySelector('.memoryBox').textContent.slice(memory.length -1, memory.length);
}

function loadCalculator() {
    const calcValues = {
        display:getDisplay(), 
        memory:getMemory(), 
        operand:getOperand()
    }
    //console.log(calcValues)
    return calcValues
}