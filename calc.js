const operatorButtons = document
  .querySelectorAll(".calcButtons")
  .forEach((x) => x.addEventListener("click", buttonInput));
const clearButton = document
  .querySelector("#clearButton")
  .addEventListener("click", clear);
const equalsButton = document
  .querySelector("#equalsButton")
  .addEventListener("click", buttonInput);
const numberContainer = document.querySelector("#numberButtons");
const resultScreen = document.querySelector("#resultScreen");
const keyCapture = document.addEventListener("keydown", keyboardShortcuts);

let firstNumber = "";
let secondNumber = "";
let operator = null;
let result = "";
let outputDisplay = firstNumber;
resultScreen.textContent = 0;

for (let i = 9; i >= 0; i--) {
  const numberButton = document.createElement("div");
  numberButton.classList.add("numberIn");
  numberButton.textContent = `${i}`;
  numberButton.addEventListener("click", buttonInput);
  numberContainer.appendChild(numberButton);
  if (i === 0) {
    const numberButton = document.createElement("div");
    numberButton.classList.add("numberIn");
    numberButton.textContent = ".";
    numberButton.addEventListener("click", buttonInput);
    numberContainer.appendChild(numberButton);
  }
}

function keyboardShortcuts(e) {}

function buttonInput(e) {
  let inputKey = e.srcElement.innerText;

  if (e.srcElement.className === "numberIn") {
    if (operator === null) {
      firstNumber === "" ? (firstNumber = inputKey) : (firstNumber += inputKey);
    } else {
      secondNumber === ""
        ? (secondNumber = inputKey)
        : (secondNumber += inputKey);
    }
  }

  if (e.srcElement.className === "calcButtons") {
    if (operator === null) {
      operator = e.srcElement.innerText;
      if (firstNumber === "") {
        firstNumber = 0;
      }
    }

    if (isValidOperation(firstNumber, secondNumber, operator)) {
      result = runMath(+firstNumber, +secondNumber, operator);
      operator = e.srcElement.innerText;
      firstNumber = result;
      secondNumber = "";
    } else {
      operator = e.srcElement.innerText;
    }
  }

  if (e.srcElement.id === "equalsButton") {
    if (isValidOperation(firstNumber, secondNumber, operator)) {
      result = runMath(+firstNumber, +secondNumber, operator);
      firstNumber = result;
      operator = "";
      secondNumber = "";
    }
  }

  displayMath();
  resultScreen.textContent = outputDisplay;
}

function isValidOperation(a, b, o) {
  if (a === 0 && o === null) return false;

  if (a !== "") {
    if (o !== null && b !== "") {
      return true;
    }
  } else {
    return false;
  }
}

function displayMath() {
  if (operator !== null) {
    outputDisplay = `${firstNumber} ${operator} ${secondNumber}`;
  } else {
    outputDisplay = firstNumber;
  }
}

function clear() {
  firstNumber = "";
  secondNumber = "";
  operator = null;
  resultScreen.textContent = 0;
}

function runMath(num1, num2, op) {
  switch (op) {
    case "+":
      return num1 + num2;

    case "-":
      return num1 - num2;

    case "x":
      return num1 * num2;

    case "/":
      //Math.round(divide(num1, num2) * 1000000) / 1000000;
      return num1 / num2;
  }
}

function add(x, y) {
  return x + y;
}
function subtract(x, y) {
  return x - y;
}
function multiply(x, y) {
  return x * y;
}
function divide(x, y) {
  return x / y;
}
