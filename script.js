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
  const outputContainer = document.getElementById("output-container");
  let operand1,
    operand2,
    result = 0;
  let operator = "";
  let numberRegEx = /[\d.]/;
  let operatorRegEx = /[+\-*\/]/;

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
    display.value = "0";
    pointBtn.disabled = false;
  }

  clearBtn.addEventListener("click", Clear);

  function Clear() {
    if (history.textContent.endsWith("=")) {
      return;
    }

    display.value = display.value.length > 1 ? DeleteDigit(display.value) : "0";

    if (!display.value.includes(".")) {
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

    if (display.value === "0") {
      display.value = "";
    }

    // Limit the amount of digit to 16
    if (display.value.length >= 16) {
      return;
    }

    if (btnValue === "." && pointBtn.disabled === true) return;

    // Disable the point button after one hit
    if (btnValue === "." && pointBtn.disabled === false)
      pointBtn.disabled = true;

    display.value += btnValue;
  }

  operatorBtns.forEach((operatorBtn) => {
    operatorBtn.addEventListener("click", (event) =>
      OperatorBtnAction(event.currentTarget.textContent)
    );
  });

  function OperatorBtnAction(btnValue) {
    if (btnValue === "*") btnValue = "x";

    if (btnValue === "/") btnValue = "÷";

    if (history.textContent !== "" && !history.textContent.endsWith("=")) {
      operand2 = Number(display.value);
      result = Operate(operand1, operand2, operator);

      if (result === "Division by zero") {
        history.textContent = `${CheckOperandLength(
          operand1
        )} ${operator} ${CheckOperandLength(operand2)} =`;
        display.value = CheckResultLength(result);
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

    if (display.value !== "Division by zero") {
      operand1 = Number(display.value);
      operator = btnValue;
      history.textContent = `${CheckOperandLength(operand1)} ${operator}`;
      PartialClear();
      equalsBtn.disabled = false;
    }
  }

  equalsBtn.addEventListener("click", equalsBtnAction);

  function equalsBtnAction() {
    operand2 = Number(display.value);
    history.textContent += ` ${CheckOperandLength(operand2)} =`;
    result = Operate(operand1, operand2, operator);
    display.value = CheckResultLength(result);
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

    if (operation === "x" || operation === "*") {
      return Multiplication(num1, num2);
    }

    if (operation === "÷" || operation === "/") {
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

  // Keyboard support
  display.addEventListener("keydown", (e) => {
    e.preventDefault();
    console.log(e);
    ReadKey(e.key);
  });

  function ReadKey(keyValue) {
    if (numberRegEx.test(keyValue)) NumberBtnAction(keyValue);

    if (operatorRegEx.test(keyValue)) OperatorBtnAction(keyValue);

    if (keyValue === "Backspace") Clear();

    if (keyValue === "Enter" && equalsBtn.disabled === false) equalsBtnAction();

    if (keyValue === "Escape") FullClear();
  }
}
