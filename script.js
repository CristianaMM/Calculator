const screenPrevious = document.getElementsByClassName(
  "calculator__screen--value"
)[0];
const screenCurrentValue = document.getElementsByClassName(
  "calculator__screen--value"
)[1];
let currentValue = "";
let firstValue = "";
let operation = undefined;
let isFinalOperation = false;

const compute = () => {
  let total;
  const firstNumber = Number(firstValue);
  const secondNumber = Number(currentValue);
  if (isNaN(firstNumber) || isNaN(secondNumber)) {
    return;
  }
  switch (operation) {
    case "+":
      total = firstNumber + secondNumber;
      break;
    case "-":
      total = firstNumber - secondNumber;
      break;
    case "x":
      total = firstNumber * secondNumber;
      break;
    case "÷":
      total = firstNumber / secondNumber;
      break;
  }

  currentValue = total ? total.toString() : currentValue;
  operation = undefined;
  firstValue = "";
};

const updateScreenDisplay = () => {
  screenCurrentValue.innerHTML = currentValue;

  if (operation) {
    screenPrevious.innerHTML = firstValue.toString() + " " + operation;
  }
};

const getValue = (event) => {
  return event.target.children[0].innerText;
};

const handleClickDelete = () => {
  currentValue = "";
  firstValue = "";
  operation = undefined;

  screenCurrentValue.innerHTML = "";
  screenPrevious.innerHTML = "";
};

const handleClickOperation = (event) => {
  if (currentValue == "") {
    return;
  }
  if (firstValue != "") {
    compute();
  }
  firstValue = currentValue;
  currentValue = "";
  operation = getValue(event);
};

const handleClickNumber = (event) => {
  const value = getValue(event);
  if (isFinalOperation) {
    currentValue = "";
    isFinalOperation = false;
  }
  if (value != "." || !currentValue.includes(".")) {
    currentValue =
      currentValue == "0" ? value : currentValue.toString() + value.toString();
  }
  updateScreenDisplay();
};
const handleChangesignal = () => {
  if (currentValue != "0") {
    currentValue =
      currentValue[0] == "-" ? currentValue.substring(1) : "-" + currentValue;
  }
  updateScreenDisplay();
};

const handleClickPercentage = (event) => {
  if (firstValue == "") {
    currentValue = Number(currentValue) / 100;
    updateScreenDisplay();
  } else {
    let total;
    const firstNumber = Number(firstValue);
    const secondNumber = Number(currentValue);
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
      return;
    }
    const percentage = (firstNumber * secondNumber) / 100;
    switch (operation) {
      case "+":
        total = firstNumber + percentage;
        break;
      case "-":
        total = firstNumber - percentage;
        break;
      case "x":
        total = firstNumber * (secondNumber / 100);
        break;
      case "÷":
        total = firstNumber / (secondNumber / 100);
        break;
    }
    currentValue = total.toString();
    operation = undefined;
    firstValue = "";
    updateScreenDisplay();
  }
};

const handleClickEquals = () => {
  isFinalOperation = true;
  compute();
  updateScreenDisplay();
};
