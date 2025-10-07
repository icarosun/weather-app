import { formatNumericalData } from "../formatData.ts"

describe('formatNumericalData()', () => {
  it("given a number decimal ex.: 0.01, formatNumericalData() returns 0,01", () => {
    expect(formatNumericalData(0.01)).toBe('0,01');
  });

  it("given a integer number, formatNumericalData() returns the number in decimal with comma", () => {
    expect(formatNumericalData(10)).toBe('10,00')
  });
}) 
