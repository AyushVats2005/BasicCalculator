//Set up reference
const numPad = document.querySelector('.numPad');
const inputDisplay = document.querySelector('.inputDisplay');
const outputDisplay = document.querySelector('.outputDisplay');

//Variables for data calculation
let currentNum = '';
let previousNum = '';
let operator = '';
//Detect clicks
const acButton = document.getElementById('ac-btn');
acButton.addEventListener('click', acFn);

const signButton = document.getElementById('sign-btn');
signButton.addEventListener('click', signFn);

const percentButton = document.getElementById('percent-btn');
percentButton.addEventListener('click', percentFn);

const addButton = document.getElementById('add-btn');
const subButton = document.getElementById('sub-btn');
const multiButton = document.getElementById('multi-btn');
const divButton = document.getElementById('div-btn');
addButton.addEventListener('click', () => setOperator('+'));
subButton.addEventListener('click', () => setOperator('-'));
multiButton.addEventListener('click', () => setOperator('*'));
divButton.addEventListener('click', () => setOperator('/'));

const equalButton = document.getElementById('equal-btn');
equalButton.addEventListener('click', equalFn);

/*const numPadButton = document.getElementById('num-btn');
//RETURN NULL CAUSE OF CLASS NOT MENTIONED, ID MENTIONED
numPadButton.addEventListener('click', numPadFn); //DOESN'T WORK */

const numberButtons = document.querySelectorAll('.num-btn');//

numberButtons.forEach((button) => {
    button.addEventListener('click', numPadFn);
})


//functions from other elements to run after clicks
function acFn() {
    currentNum = '';
    previousNum = '';
    operator = '';
    displayFn();
}

function setOperator(op) {
    if (currentNum === '' && previousNum === '')
        return;

    if(previousNum !== '' && currentNum !== '') {
        currentNum = calculate().toString();
    }

    operator = op;
    previousNum = currentNum;
    currentNum = '';
    displayFn();
}

function equalFn() {
    currentNum = calculate().toString();
    operator = '';
    previousNum = '';
    displayFn();
    currentNum ='';
}

function numPadFn(event) {
    const value = event.target.textContent;
    if (value !== '+' && value !== '-' && value !== '*' && value !== '/') {
        currentNum += value;
    }
    displayFn();
}

function displayFn() {
    let outputSt=`${previousNum} ${operator} ${currentNum}`;
    inputDisplay.textContent = outputSt;
    outputDisplay.textContent = currentNum;
}

//ai code
function signFn() {
    if (currentNum) {
        currentNum = (-parseFloat(currentNum)).toString();
        displayFn();
    }
}

function percentFn() {
    if (currentNum) {
        currentNum = (parseFloat(currentNum) / 100).toString();
        displayFn();
    }
}

function calculate() {
    const prev = parseFloat(previousNum);
    const curr = parseFloat(currentNum);

    if (isNaN(prev) || isNaN(curr)) return 0;

    switch (operator) {
        case '+': return prev + curr;
        case '-': return prev - curr;
        case '*': return prev * curr;
        case '/': return curr === 0 ? 'Error' : prev / curr;
        default: return curr;
    }
}