function gcb(a, b) {
  if (a % b === 0) {
    return b
  }
  return arguments.callee(b, a % b)
}