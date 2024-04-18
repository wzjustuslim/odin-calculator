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

const cache = []
const memory = []
const lastEval = []
const display = document.getElementsByClassName('display')[0]
const operators = ['+', '-', '*', '/']
const integers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

function handleClear() {
  cache.length = 0
  memory.length = 0
  lastEval.length = 0
  setDisplay()
}

Array.from(document.getElementsByClassName('clear')).forEach((el) => {
  el.addEventListener('click', () => {
    handleClear()
  })
})

function handleDot(dot) {
  if (!cache.length) cache.push('0')
  if (cache.includes(dot)) return
  cache.push(dot)
  setDisplay(cache.join(''))
}

Array.from(document.getElementsByClassName('dot')).forEach((el) => {
  el.addEventListener('click', () => {
    const dot = el.textContent
    handleDot(dot)
  })
})

function handleNumbers(number) {
  cache.push(number)
  if (cache[0] === '0' && cache[1] === number) cache.shift()
  setDisplay(cache.join(''))
}

Array.from(document.getElementsByClassName('number')).forEach((el) => {
  el.addEventListener('click', () => {
    const number = el.textContent
    handleNumbers(number)
  })
})

function handleOperators(operator) {
  if (cache.length) {
    memory.push(cache.join(''))
    cache.length = 0
  }

  if (memory.length === 3) calculate()

  if (memory.length) {
    if (operators.some(i => memory.includes(i))) {
      const index = memory.findIndex(j => operators.includes(j))
      memory[index] = operator
    } else {
      memory.push(operator)
    }
  }

  if (memory.length === 3) memory.shift()
}

Array.from(document.getElementsByClassName('operator')).forEach((el) => {
  el.addEventListener('click', () => {
    const operator = el.textContent
    handleOperators(operator)
  })
})

function handleEqual() {
  if (cache.length) {
    memory.push(cache.join(''))
    cache.length = 0
  }

  if (memory.length === 2 && operators.some(i => memory.includes(i))) {
    memory.push(memory[0])
  }

  if (memory.length === 2 && !operators.some(i => memory.includes(i))) {
    memory.shift()
  }

  if (memory.length === 1 && lastEval.length) {
    memory.push(lastEval[0])
    memory.push(lastEval[1])
  }

  if (memory.length === 3) calculate()
}

Array.from(document.getElementsByClassName('equal')).forEach((el) => {
  el.addEventListener('click', () => {
    handleEqual()
  })
})

function calculate() {
  if (memory.length === 3) {
    const result = operate(memory[0], memory[2], memory[1]).toString()
    setDisplay(result)
    lastEval.length = 0
    lastEval.push(memory[1])
    lastEval.push(memory[2])
    memory.length = 0
    memory.push(result)
  }
}

function verify() {
  console.log('cache', cache)
  console.log('memory', memory)
  console.log('lastEval', lastEval)
}

function setDisplay(string) {
  if (string === 'NaN') {
    display.textContent = 'To infinity and beyond!'
    return
  }
  if (string) {
    display.textContent = string
    return
  }
  display.textContent = '0'
}

document.addEventListener('keydown', (e) => {
  console.log(e.key)
  if (integers.includes(e.key)) {
    handleNumbers(e.key)
  }
  if (operators.includes(e.key)) {
    handleOperators(e.key)
  }
  if (e.key === '.') {
    handleDot(e.key)
  }
  if (e.key === '=' || e.key === 'Enter') {
    handleEqual()
  }
  if (e.key === 'Escape') {
    handleClear()
  }
})

setDisplay()

// 5 inv => -5
// cache = 0 / memo = 1 / memo excl ops

// 2 inv => -2
// cache = 1 / memo = 0 / memo excl ops

// 5 inv => && memo incl ops 1 inv = -6

// if no cache invert memo
// if no memo invert cache
// if memo and cache invert cache