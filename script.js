Calculator();
function Calculator() {
  const history = document.getElementById("history");
  const display = document.getElementById("main-display");
  const numberBtns = document.querySelectorAll(".number");
  const operatorBtns = document.querySelectorAll(".operator");
  const pointBtn = document.getElementById("point");
  const equalsBtn = document.getElementById("equals");
  const clearBtn = document.getElementById("clear");
  const numRegex = /\d/g;
  let operand1,
    operand2,
    result = 0;
  let operator = "";

  FullClear();

  clearBtn.addEventListener("click", FullClear);

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
    if (display.textContent.length < 16) {
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
        history.textContent = `${operand1} ${operator} ${operand2} =`;
        display.textContent = result;
        equalsBtn.disabled = true;
        return;
      }
      operand1 = result;
      operator = btnValue;
      history.textContent = `${operand1} ${operator}`;
      PartialClear();
      equalsBtn.disabled = false;
      return;
    }

    if (display.textContent !== "Division by zero") {
      operand1 = Number(display.textContent);
      operator = btnValue;
      history.textContent = `${operand1} ${operator}`;
      PartialClear();
      equalsBtn.disabled = false;
    }
  }

  equalsBtn.addEventListener("click", equalsBtnAction);

  function equalsBtnAction() {
    operand2 = Number(display.textContent);
    history.textContent += ` ${operand2} =`;
    result = Operate(operand1, operand2, operator);
    display.textContent = result.toString();
    equalsBtn.disabled = true;
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
