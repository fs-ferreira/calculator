const numeros = document.querySelectorAll("#number");
const operadores = document.querySelectorAll("#operator");
const calcular = document.querySelector("#calculate");
const del = document.querySelector("#delete");
const clean = document.querySelector("#clean");
var prevNumber, currentNumber, operator;
var hasPrev = false;
const display = document.querySelector("#equation");

numeros.forEach((button) => {
  button.addEventListener("click", () => {
    if (hasPrev) {
      display.value = null;
      hasPrev = false;
    }
    display.value = display.value + button.innerText;
    currentNumber = display.value;
  });
});

operadores.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentNumber) {
      if (!prevNumber) {
        prevNumber = currentNumber;
      }
      display.value = null;
      hasPrev = true;
    }
    display.value = button.innerText;
    operator = display.value;
  });
});

calcular.addEventListener("click", (button) => {
  if (prevNumber && currentNumber && operator) {
    display.value = calc(Number(prevNumber), Number(currentNumber), operator);
    prevNumber = display.value;
  }
});

del.addEventListener("click", (button) => {
  display.value = display.value.substring(0, display.value.length - 1);
  prevNumber = display.value;
});

clean.addEventListener("click", (button) => {
  display.value = null;
  prevNumber = null;
  currentNumber = null;
  operator = null;
});
