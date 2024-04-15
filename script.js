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
const value = []
const lastOperation = []
const display = document.getElementsByClassName('display')[0]

Array.from(document.getElementsByClassName('clear')).forEach((el) => {
  el.addEventListener('click', () => {
    memory.length = 0
    value.length = 0
    display.textContent = '0'
  })
})

Array.from(document.getElementsByClassName('dot')).forEach((el) => {
  el.addEventListener('click', () => {
    // if value includes dot, do nothing
    if (value.includes('.')) {
      return
    }
    // if value is empty push 0 to value before dot
    if (value.length === 0) {
      value.push('0')
      value.push(el.textContent)
      display.textContent = value.join('')
    } else {
      value.push(el.textContent)
      display.textContent = parseFloat(value.join('')).toString() + '.'
    }
    console.log('value', value)
  })
})

Array.from(document.getElementsByClassName('number')).forEach((el) => {
  el.addEventListener('click', () => {
    // push number into value
    value.push(el.textContent)
    // display numbers
    display.textContent = parseFloat(value.join('')).toString()
    console.log('value', value)
  })
})

Array.from(document.getElementsByClassName('operator')).forEach((el) => {
  el.addEventListener('click', () => {
    // if nothing in memory and there is value
    if (memory.length === 0 && value.length) {
      // push value into memory
      memory.push(value.join(''))
      // empty value
      value.length = 0
    }
    // if first number in memory
    if (memory.length === 1) {
      // push operator into memory
      memory.push(el.textContent)
    }
    // if solve with one number and one sign
    if (value.length === 0 && memory.length === 2 && el.textContent === '=') {
      memory.push(memory[0])
    }
    // if first number and sign in memory and there is value
    if (memory.length === 2 && value.length) {
      // push value into memory
      memory.push(value.join(''))
      // empty value
      value.length = 0
    }
    // if both numbers and sign in memory
    if (memory.length === 3) {
      // operate to derive results
      // stuck should not operate after equal then sign with 3 in memory
      const result = operate(memory[0], memory[2], memory[1])
      // cache last operation
      lastOperation.length = 0
      lastOperation.push(memory[1])
      lastOperation.push(memory[2])
      // empty memory after getting results
      memory.length = 0
      // load memory with result and sign
      memory.push(result.toString())
      // if sign is not '=' 
      if (el.textContent !== '=') {
        memory.push(el.textContent)
      }
      display.textContent = result.toString()
    }
    console.log('value', value)
    console.log('memory', memory)
  })
})
