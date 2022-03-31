const calculatorScreen = document.querySelector('.calculator-screen')
const operators = document.querySelectorAll(".operator")
const equalSign = document.querySelector(".equal-sign")
const clearBtn = document.querySelector(".all-clear")
const decimal = document.querySelector('.decimal')
const operatorSign = document.querySelector('.operator-sign-mini')
const numbers = document.querySelectorAll(".number")

const thousands_separators = (num) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}

let prevNumber = ''
let calculationOperator = ''
let currentNumber = '0'
let result = ''
let equalResult = false

const setMiniSign = (text) => {
    operatorSign.innerHTML = text
}

const updateScreen = (number) => {
    calculatorScreen.value = thousands_separators(number)
}

const updateMiniScreen = (number) => {
    operatorSign.innerHTML = number
}

const inputNumber = (number) => {
    if (currentNumber == '0' || equalResult == true) {
        currentNumber = number
    } else {
        currentNumber += number
    }
}

const inputOperator = (operator) => {
    if (operatorSign.innerHTML != '' && equalResult == true) {
        setMiniSign('ters')
    } else if (prevNumber != '') {
        calculate()
    }

    prevNumber = currentNumber
    calculationOperator = operator
    if (operator == 'sqr') {
        currentNumber = currentNumber
    } else {
        currentNumber = '0'

    }
}

const calculate = () => {
    let result = ''
    switch (calculationOperator) {
        case "+":
            result = parseFloat(prevNumber) + parseFloat(currentNumber)
            break
        case "-":
            result = prevNumber - currentNumber
            break
        case "*":
            result = prevNumber * currentNumber
            break
        case "/":
            result = prevNumber / currentNumber
            break
        default:
            return
    }
    currentNumber = result
    result = ''
    calculationOperator = ''
}

const clearAll = () => {
    prevNumber = ''
    calculationOperator = ''
    currentNumber = '0'
}

//Nangkap Tombol Number
numbers.forEach((number) => {
    number.addEventListener("click", (event) => {
        if (prevNumber == '') {
            equalResult = false
        }
        inputNumber(event.target.value)
        updateScreen(currentNumber)
    })
})

//Nangkap Tombol Operator
operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        equalResult = false

        inputOperator(event.target.value)
        if (event.target.value == "sqr") {
            setMiniSign(`sqr(${prevNumber})`)
            currentNumber = prevNumber * prevNumber
            updateScreen(currentNumber)
        } else if (equalResult = false) {
            operatorSign.innerHTML += 'false' + event.target.value
            updateScreen('0');
        } else {
            operatorSign.innerHTML = prevNumber + event.target.value
            updateScreen('0');
        }
    })
})

//Nangkap Perintah '='
equalSign.addEventListener('click', () => {
    if (equalResult == false) {
        operatorSign.innerHTML += currentNumber
    }
    calculate()
    updateScreen(currentNumber)
    prevNumber = ''
    equalResult = true
})

//Perintah Decimal
inputDecimal = (dot) => {
    if (currentNumber.includes('.')) {
        return
    }
    currentNumber += dot
}

//Tombol AC
clearBtn.addEventListener('click', () => {
    clearAll()
    updateScreen(currentNumber)
    setMiniSign('')
    equalResult = false
})

//Tombol Decimal
decimal.addEventListener('click', (event) => {
    inputDecimal(event.target.value)
    updateScreen(currentNumber)
})