let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let resetDisplay = false;

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', () => handleClick(button.textContent));
});

function handleClick(value) {
  if (value >= '0' && value <= '9') {
	handleDigit(value);
  } else if (['+', '-', '*', '/'].includes(value)) {
	handleOperator(value);
  } else if (value === '=') {
	evaluate();
  } else if (value === 'C') {
	handleClear();
  } else if (value === '.') {
	handleDecimal();
  }
}

function handleDigit(digit) {
  if (resetDisplay || display.textContent === '0') {
	display.textContent = digit;
  } else {
	display.textContent += digit;
  }
}

function handleOperator(operator) {
  const parts = display.textContent.split(' ');

  if (currentOperator === null) {
	firstOperand = display.textContent;
	currentOperator = operator;
	display.textContent += ` ${operator} `;
	resetDisplay = false;
  } else if (parts.length === 3) {
	secondOperand = parts[2];
	const result = operate(currentOperator, firstOperand, secondOperand);

	firstOperand = result;
	currentOperator = operator

	if (typeof result === 'number') {
	  display.textContent = `${Math.round(result * 1000) / 1000} ${operator} `;
	} else {
	  display.textContent = result;
	}

	resetDisplay = false;
  } else {
	display.textContent = `${firstOperand} ${operator} `;
	currentOperator = operator;
  }
}

function evaluate() {
  const parts = display.textContent.split(' ');
  if (parts !== 3) return;

  const [a, operator, b] = parts;
  const result = operate(operator, a, b);

  if (typeof result === 'number') {
	display.textContent = Math.round(result * 1000) / 1000;
  } else {
	display.textContent = result;
  }

  firstOperand = display.textContent;
  currentOperator = null;
  resetDisplay = null;
}

function handleClear() {
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;

  display.textContent = '0';
}

function handleDecimal() {
  const parts = display.textContent.split(' ');
  const lastPart = parts[parts.length - 1];
  if (resetDisplay) {
	display.textContent = '0.';
	resetDisplay = false;
  } else if (!lastPart.includes('.')) {
	display.textCOntent += '.';
  }
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (currentOperator) {
	case '+':
	  return add(a, b);
	case '-':
	  return subtract(a, b);
	case '*':
	  return multiply(a, b);
	case '/':
	  return divide(a, b);
	default:
	  return null;
  }
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
  if (b === 0) return 'Nope!';
  return a / b;
}
