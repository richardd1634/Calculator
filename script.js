Calculator();
function Calculator() {
  const btn = document.querySelectorAll(".number .operator .equal");

  function Operate(num1, num2, operator) {
    if (operator === "+") {
      return Addition(num1, num2);
    }

    if (operator === "-") {
      return Substraction(num1, num2);
    }

    if (operatior === "*") {
      return Multiplication(num1, num2);
    }

    ir (operator === "/") {
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
