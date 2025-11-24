function flushOperation(mem, operator, value, OPERATIONS) {
  if (!OPERATIONS[operator]) {
    return mem; // operador inválido → no cambia nada
  }
  return OPERATIONS[operator](mem, value);
}
