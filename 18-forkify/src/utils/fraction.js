export class Fraction {
  constructor(value) {
    this.value = value;
  }

  toString() {
    const tolerance = 1.0e-6;
    let numerator = 1;
    let denominator = 1;
    let minError = Math.abs(this.value - numerator / denominator);

    for (let d = 1; d <= 100; d++) {
      const n = Math.round(this.value * d);
      const error = Math.abs(this.value - n / d);
      if (error < minError) {
        numerator = n;
        denominator = d;
        minError = error;
      }
      if (minError < tolerance) break;
    }

    const whole = Math.floor(numerator / denominator);
    const remainder = numerator % denominator;

    if (remainder === 0) return `${whole}`; // чисте число
    if (whole === 0) return `${remainder}/${denominator}`; // менше 1
    return `${whole} ${remainder}/${denominator}`; // змішане число
  }
}
