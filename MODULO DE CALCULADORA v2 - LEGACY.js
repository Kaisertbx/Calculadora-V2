// ================================
// CALCULADORA REFACTORIZADA v3
// ================================

class Calculator {
  constructor(historyLimit = 5) {
    this.buffer = "0";
    this.memoria = null;
    this.ultimoOperador = null;
    this.historial = [];
    this.historyLimit = historyLimit;
  }

  // ------ INTERFAZ PUBLICA ------
  input(value) {
    if (isNaN(parseFloat(value))) {
      this.handleSymbol(value);
    } else {
      this.handleNumber(value);
    }
    return this.buffer;
  }

  getHistory() {
    return [...this.historial];
  }

  // ------ NUMEROS ------
  handleNumber(value) {
    this.buffer = (this.buffer === "0") ? value : this.buffer + value;
  }

  // ------ SIMBOLOS ------
  handleSymbol(symbol) {
    const scientificOps = ["sin", "cos", "tan"];

    if (symbol === "C") {
      this.reset();
      return;
    }

    if (symbol === "=") {
      this.executePending();
      return;
    }

    if (["+", "-", "*", "/"].includes(symbol)) {
      this.prepareOperation(symbol);
      return;
    }

    if (scientificOps.includes(symbol)) {
      this.executeScientific(symbol);
      return;
    }
  }

  // ------ OPERACIONES BASICAS ------
  prepareOperation(operator) {
    const value = parseFloat(this.buffer);

    if (this.memoria === null) {
      this.memoria = value;
    } else {
      this.compute(value);
    }

    this.ultimoOperador = operator;
    this.buffer = "0";
  }

  executePending() {
    if (!this.ultimoOperador) return;

    const value = parseFloat(this.buffer);
    this.compute(value);

    this.buffer = String(this.memoria);
    this.memoria = null;
    this.ultimoOperador = null;
  }

  compute(value) {
    const op = this.ultimoOperador;
    const prev = this.memoria;

    const operations = {
      "+": () => prev + value,
      "-": () => prev - value,
      "*": () => prev * value,
      "/": () => prev / value,
    };

    this.memoria = operations[op]();
    this.addToHistory(`${prev} ${op} ${value} = ${this.memoria}`);
  }

  // ------ OPERACIONES CIENTIFICAS ------
  executeScientific(symbol) {
    const value = parseFloat(this.buffer);

    const operations = {
      sin: Math.sin,
      cos: Math.cos,
      tan: Math.tan,
    };

    const result = operations[symbol](value);

    this.buffer = String(result);
    this.addToHistory(`${symbol}(${value}) = ${result}`);
  }

  // ------ HISTORIAL ------
  addToHistory(entry) {
    this.historial.push(entry);
    if (this.historial.length > this.historyLimit) {
      this.historial.shift();
    }
  }

  // ------ RESET ------
  reset() {
    this.buffer = "0";
    this.memoria = null;
    this.ultimoOperador = null;
  }
}

// ================================
// UI (separada del núcleo)
// ================================
const calc = new Calculator();

function updateScreen() {
  document.getElementById("display").innerText = calc.buffer;
}

function buttonClick(value) {
  calc.input(value);
  updateScreen();
}

function init() {
  document.querySelector(".buttons")
    .addEventListener("click", e => buttonClick(e.target.innerText));
}

init();
