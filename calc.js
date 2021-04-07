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

let firstNumber = "";
let secondNumber = "";
let operator = "";
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
    numberButton.textContent = ",";
    numberButton.addEventListener("click", buttonInput);
    numberContainer.appendChild(numberButton);
  }
}

function displayMath() {
  if (operator !== "") {
    outputDisplay = `${firstNumber} ${operator} ${secondNumber}`;
  } else {
    outputDisplay = firstNumber;
  }
}

function isValidOperation() {
  if (firstNumber !== "") {
    if (operator !== "" && secondNumber !== "");
    return true;
  }
}

function buttonInput(e) {
  if (e.srcElement.className === "numberIn") {
    if (operator === "") {
      firstNumber === ""
        ? (firstNumber = e.srcElement.innerText)
        : (firstNumber += e.srcElement.innerText);
    } else {
      secondNumber === ""
        ? (secondNumber = e.srcElement.innerText)
        : (secondNumber += e.srcElement.innerText);
    }
  }
  if (e.srcElement.className === "calcButtons") {
    if (operator === "") {
      operator = e.srcElement.innerText;
      if (firstNumber === "") firstNumber = 0;
    }
    if (isValidOperation()) {
      result = runMath(+firstNumber, +secondNumber, operator);
      operator = e.srcElement.innerText;
      firstNumber = result;
      secondNumber = "";
    } else {
      operator = e.srcElement.innerText;
    }
  }

  if (e.srcElement.id === "equalsButton") {
    result = runMath(+firstNumber, +secondNumber, operator);
    outputDisplay = result;
  } else {
    displayMath();
  }
  resultScreen.textContent = outputDisplay;
}

function clear() {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  resultScreen.textContent = 0;
}

function runMath(num1, num2, op) {
  switch (op) {
    case "+":
      return add(num1, num2);

    case "-":
      return subtract(num1, num2);

    case "x":
      return multiply(num1, num2);

    case "/":
      return divide(num1, num2);
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
