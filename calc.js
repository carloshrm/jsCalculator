const operatorButtons = document
  .querySelectorAll(".calcButtons")
  .forEach((x) => x.addEventListener("click", buttonInput));
const clearButton = document
  .querySelector("#Escape")
  .addEventListener("click", clear);
const equalsButton = document
  .querySelector("#Enter")
  .addEventListener("click", runEquals);
const backButton = document
  .querySelector("#Backspace")
  .addEventListener("click", backspace);
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
  numberButton.setAttribute("id", i);
  numberButton.addEventListener("click", buttonInput);
  numberContainer.appendChild(numberButton);
  if (i === 0) {
    const numberButton = document.createElement("div");
    numberButton.classList.add("numberIn");
    numberButton.textContent = ".";
    numberButton.setAttribute("id", ",");
    numberButton.addEventListener("click", buttonInput);
    numberContainer.appendChild(numberButton);
  }
}

function keyboardShortcuts(e) {
  let targetButton = document.getElementById(e.key);
  if (targetButton) {
    targetButton.click();
  }
}

function backspace() {
  if (operator === null) {
    firstNumber.length <= 1
      ? (firstNumber = "0")
      : (firstNumber = firstNumber.substr(0, firstNumber.length - 1));
  } else {
    secondNumber.length <= 1
      ? (secondNumber = "0")
      : (secondNumber = secondNumber.substr(0, secondNumber.length - 1));
  }
  displayMath();
}

function buttonInput(e) {
  let inputKey = e.srcElement.innerText;
  let inputType = e.srcElement.className;
  //    Check what kind of button was pressed
  //if it's a number, check if the operator was set. if yes, then the number comes after
  //if an operator was pressed, set or overwrite the operator. check for a first number, if none, then assume it as zero
  //    in case an operator is pressed repeatedly, check if two values are set, and run the math operation
  //    the result is then set as first number, the new operator is set, and the calculator waits for a second number again.
  // numbers are "added together" as string, only get parsed with a + when the math runs

  if (inputType === "numberIn") {
    if (operator === null) {
      if (firstNumber.length > 10) return;
      if (firstNumber === "") {
        firstNumber = inputKey;
      } else {
        if (firstNumber.indexOf(".") !== -1 && inputKey === ".") return;
        firstNumber += inputKey;
      }
    } else {
      if (secondNumber.length > 10) return;
      if (secondNumber === "") {
        secondNumber = inputKey;
      } else {
        if (secondNumber.indexOf(".") !== -1 && inputKey === ".") return;
        secondNumber += inputKey;
      }
    }
  }

  if (inputType === "calcButtons") {
    if (operator === null) {
      operator = e.srcElement.innerText;
      if (firstNumber === "") {
        firstNumber = 0;
      }
    }
    if (isValidOperation(firstNumber, secondNumber, operator)) {
      result = runMath(+firstNumber, +secondNumber, operator);
      operator = e.srcElement.innerText;
      firstNumber = `${Math.round(result * 1000000000) / 1000000000}`;
      secondNumber = "";
    } else {
      operator = e.srcElement.innerText;
    }
  }
  displayMath();
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
  resultScreen.textContent = outputDisplay;
}

function clear() {
  firstNumber = "";
  secondNumber = "";
  operator = null;
  resultScreen.textContent = 0;
}

function runEquals() {
  if (isValidOperation(firstNumber, secondNumber, operator)) {
    result = runMath(+firstNumber, +secondNumber, operator);
    firstNumber = `${Math.round(result * 1000000000) / 1000000000}`;
    operator = null;
    secondNumber = "";
  }
  displayMath();
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
// function add(x, y) {
//   return x + y;
// }
// function subtract(x, y) {
//   return x - y;
// }
// function multiply(x, y) {
//   return x * y;
// }
// function divide(x, y) {
//   return x / y;
// }
