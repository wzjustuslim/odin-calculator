let x
let y
let operator

function add(x, y) {
  return x + y
}

function subtract(x, y) {
  return x - y
}

function multiply(x, y) {
  return x * y
}

function divide(x, y) {
  return x / y
}

function operate(x, y, operator) {
  switch (operator) {
    case '/':
      return divide(x, y)
      break;
    
    case '*':
      return multiply(x, y)
      break;
    
    case '-':
      return subtract(x, y)
      break;
    
    case '+':
      return add(x, y)
      break;
  
    default:
      break;
  }
}