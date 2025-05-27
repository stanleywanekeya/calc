let firstOperand = null;
let secondOperand = null;
let currentOperator = null;

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
