/*
let runningTotal = 0;
let buffer = "0";
let previousOperator;
const screen = document.querySelector(".result");

document.querySelector(".calc").addEventListener("click", function (event) {
  console.log("here");
});

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
  rerender();
}

function handleSymbol(value) {}

function rerender() {
  screen.innerText = buffer;
}
