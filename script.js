function add(x, y) {
  return parseFloat(x) + parseFloat(y)
}

function subtract(x, y) {
  return parseFloat(x) - parseFloat(y)
}

function multiply(x, y) {
  return parseFloat(x) * parseFloat(y)
}

function divide(x, y) {
  if (parseFloat(y) === 0) {
    return NaN
  } 
  return parseFloat(x) / parseFloat(y)
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

const memory = []
const value = ['0']
const lastOperation = []
const display = document.getElementsByClassName('display')[0]

Array.from(document.getElementsByClassName('clear')).forEach((el) => {
  el.addEventListener('click', () => {
    memory.length = 0
    value.length = 0
    value.push('0')
    lastOperation.length = 0
    setDisplay()
    verify()
  })
})

Array.from(document.getElementsByClassName('dot')).forEach((el) => {
  el.addEventListener('click', () => {
    if (value.includes(el.textContent)) {
      verify()
      return
    }
    value.push(el.textContent)
    setDisplay()
    verify()
  })
})

Array.from(document.getElementsByClassName('number')).forEach((el) => {
  el.addEventListener('click', () => {
    value.push(el.textContent)
    if (value[0] === '0' && value[1] === el.textContent) value.shift()
    setDisplay()
    verify()
  })
})

Array.from(document.getElementsByClassName('operator')).forEach((el) => {
  el.addEventListener('click', () => {
    
    console.log('value', value)
    console.log('memory', memory)
  })
})

function verify() {
  console.log('value', value)
  console.log('memory', memory)
}

function setDisplay() {
  display.textContent = value.join('')
}
