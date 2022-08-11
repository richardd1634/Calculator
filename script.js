Calculator();
function Calculator() {
  const history = document.getElementById("history");
  const display = document.getElementById("main-display");
  const numberBtns = document.querySelectorAll(".number");
  const operatorBtns = document.querySelectorAll(".operator");
  const pointBtn = document.getElementById("point");
  const equalBtn = document.getElementById("equal");
  const clearBtn = document.getElementById("clear");
  const numRegex = /\d/g;
  let operand1,
    operand2,
    operator,
    result = 0;

  FullClearDisplay();

  clearBtn.addEventListener("click", FullClearDisplay);

  function FullClearDisplay() {
    history.textContent = "";
    equalBtn.disabled = true;
    PartialClearDisplay();
  }

  function PartialClearDisplay() {
    display.textContent = "0";
    pointBtn.disabled = false;
  }

  numberBtns.forEach((numberBtn) => {
    numberBtn.addEventListener("click", (event) =>
      NumberBtnClicked(event.currentTarget.textContent)
    );
  });

  function NumberBtnClicked(btnValue) {
    if (history.textContent.endsWith("=")) {
      FullClearDisplay();
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
      OperatorBtnClicked(event.currentTarget.textContent)
    );
  });

  function OperatorBtnClicked(btnValue) {
    // if (history.textContent.endsWith(/[+-/*]/)) {
    //   operatorBtns.disabled = true;
    // }

    operand1 = Number(display.textContent);
    operator = btnValue;
    history.textContent = `${operand1} ${operator}`;
    PartialClearDisplay();
    equalBtn.disabled = false;
  }

  equalBtn.addEventListener("click", () => {
    operand2 = Number(display.textContent);
    history.textContent += ` ${operand2} =`;
    result = Operate(operand1, operand2, operator);
    display.textContent = result.toString();
    equalBtn.disabled = true;
  });

  function Operate(num1, num2, operation) {
    if (operation === "+") {
      return Addition(num1, num2);
    }

    if (operation === "-") {
      return Substraction(num1, num2);
    }

    if (operation === "*") {
      return Multiplication(num1, num2);
    }

    if (operation === "/") {
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
    return num1 / num2;
  }
}
