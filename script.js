Calculator();
function Calculator() {
  const history = document.getElementById("history");
  const display = document.getElementById("main-display");
  const numberBtns = document.querySelectorAll(".number");
  const operatorBtns = document.querySelectorAll(".operator");
  const pointBtn = document.getElementById("point");
  const equalsBtn = document.getElementById("equals");
  const clearAllBtn = document.getElementById("clear-all");
  const clearBtn = document.getElementById("clear");
  const numRegex = /\d/g;
  let operand1,
    operand2,
    result = 0;
  let operator = "";

  FullClear();

  clearAllBtn.addEventListener("click", FullClear);

  function FullClear() {
    operand1 = 0;
    operand2 = 0;
    operator = "";
    result = 0;
    history.textContent = "";
    equalsBtn.disabled = true;
    PartialClear();
  }

  function PartialClear() {
    display.textContent = "0";
    pointBtn.disabled = false;
  }

  clearBtn.addEventListener("click", Clear);

  function Clear() {
    if (history.textContent.endsWith("=")) {
      return;
    }

    display.textContent =
      display.textContent.length > 1 ? DeleteDigit(display.textContent) : "0";

    if (!display.textContent.includes(".")) {
      pointBtn.disabled = false;
    }
  }

  function DeleteDigit(digits) {
    return digits.slice(0, digits.length - 1);
  }

  numberBtns.forEach((numberBtn) => {
    numberBtn.addEventListener("click", (event) =>
      NumberBtnAction(event.currentTarget.textContent)
    );
  });

  function NumberBtnAction(btnValue) {
    if (history.textContent.endsWith("=")) {
      FullClear();
    }

    if (display.textContent === "0") {
      display.textContent = "";
    }

    // Limit the amount of digit to 16
    if (display.textContent.length < 17) {
      display.textContent += btnValue;
    }

    // Disable the point button after one hit
    if (btnValue === ".") {
      pointBtn.disabled = true;
    }
  }

  operatorBtns.forEach((operatorBtn) => {
    operatorBtn.addEventListener("click", (event) =>
      OperatorBtnAction(event.currentTarget.textContent)
    );
  });

  function OperatorBtnAction(btnValue) {
    if (history.textContent !== "" && !history.textContent.endsWith("=")) {
      operand2 = Number(display.textContent);
      result = Operate(operand1, operand2, operator);
      if (result === "Division by zero") {
        history.textContent = `${CheckOperandLength(
          operand1
        )} ${operator} ${CheckOperandLength(operand2)} =`;
        display.textContent = CheckResultLength(result);
        equalsBtn.disabled = true;
        return;
      }
      operand1 = result;
      operator = btnValue;
      history.textContent = `${CheckOperandLength(operand1)} ${operator}`;
      PartialClear();
      equalsBtn.disabled = false;
      return;
    }

    if (display.textContent !== "Division by zero") {
      operand1 = Number(display.textContent);
      operator = btnValue;
      history.textContent = `${CheckOperandLength(operand1)} ${operator}`;
      PartialClear();
      equalsBtn.disabled = false;
    }
  }

  equalsBtn.addEventListener("click", equalsBtnAction);

  function equalsBtnAction() {
    operand2 = Number(display.textContent);
    history.textContent += ` ${CheckOperandLength(operand2)} =`;
    result = Operate(operand1, operand2, operator);
    display.textContent = CheckResultLength(result);
    equalsBtn.disabled = true;
  }

  function CheckResultLength(output) {
    return output.toString().length <= 17
      ? output.toString()
      : output.toExponential(11);
  }

  function CheckOperandLength(output) {
    return output.toString().length <= 11
      ? output.toString()
      : output.toExponential(6);
  }

  function Operate(num1, num2, operation) {
    if (operation === "+") {
      return Addition(num1, num2);
    }

    if (operation === "-") {
      return Substraction(num1, num2);
    }

    if (operation === "x") {
      return Multiplication(num1, num2);
    }

    if (operation === "÷") {
      return Division(num1, num2);
    }
  }

  function Addition(num1, num2) {
    return num1 + num2;
  }

  function Substraction(num1, num2) {
    return num1 - num2;
  }

  function Multiplication(num1, num2) {
    return num1 * num2;
  }

  function Division(num1, num2) {
    return num2 > 0 ? num1 / num2 : "Division by zero";
  }
}
