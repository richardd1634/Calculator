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
    operator = 0;

  clearBtn.addEventListener("click", () => {
    history.textContent = "";
    ClearDisplay();
  });

  function ClearDisplay() {
    display.textContent = "0";
    pointBtn.disabled = false;
  }

  numberBtns.forEach((numberBtn) => {
    numberBtn.addEventListener("click", (event) =>
      NumberBtnClicked(event.currentTarget.textContent)
    );
  });

  function NumberBtnClicked(btnValue) {
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
    operator = btnValue;
    const numbersArray =
      history.textContent !== "" ? history.textContent.match(numRegex) : ["0"];
    operand1 = Number(numbersArray.join(""));
    operand2 = Number(display.textContent);
    history.textContent = `${Operate(
      operand1,
      operand2,
      operator
    )} ${operator}`;
    ClearDisplay();
  }

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
