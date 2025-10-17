export function formatNumericalData(value: number) {
  return value.toFixed(2).replace('.', ',')
}

export function formatValueWithUnity(value: number | null): string {
  if (value == null) {
    return "--"
  }

  if (value === 0) {
    return "0 cm"
  }

  const absValue = Math.abs(value);
  const integer = Math.floor(absValue / 100);
  const decimal = absValue % 100;
  const sign = value < 0 ? "-" : "";

  const unity = integer === 0 ? "cm" : "m";

  let formatted: string;

  if (integer === 0) {
    formatted = `${sign}${decimal}`;
  } else {
    if (decimal < 10) {
      formatted = `${sign}${integer},0${decimal}`;
    } else {
      formatted = `${sign}${integer},${decimal}`;
    }
  }

  return `${formatted} ${unity}`
}
