// https://adventofcode.com/2025/day/3

import { getRange, sum } from './utils.ts';

export function part1(input: string) {
  const banks = parseInput(input);
  return sum(banks, (bank) => getLargestJoltage(bank, 2));
}

export function part2(input: string) {
  const banks = parseInput(input);
  return sum(banks, (bank) => getLargestJoltage(bank, 12));
}

function parseInput(input: string) {
  return input
    .split('\n')
    .map((row) => row.split('').map((d) => +d));
}

/**
 * Finds largest joltage recursively.
 * Since number of digits in number is fixed, largest number should have largest possible first digit.
 * Find largest first digit such that there are enough digits on its right side for required number size.
 * Repeat this recursively for next digits.
 */
function getLargestJoltage(bank: number[], size: number): number {
  // Descending order
  const digits = getRange(0, 10).reverse();
  if (size === 1) {
    return Math.max(...bank);
  }
  for (const firstDigit of digits) {
    const firstIndex = bank.indexOf(firstDigit);
    if (firstIndex === -1 || firstIndex > bank.length - size) {
      continue;
    }
    const nextDigits = getLargestJoltage(bank.slice(firstIndex + 1), size - 1);
    return +`${firstDigit}${nextDigits}`;
  }
  throw new Error('Not found');
}
