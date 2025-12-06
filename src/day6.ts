// https://adventofcode.com/2025/day/6

import { multiply, parseNumbers, sum } from './utils.ts';

interface Problem {
  operator: '+' | '*';
  numbers: number[];
}

export function part1(input: string) {
  const problems = parseInput(input);
  return sum(problems, solveProblem);
}

export function part2(input: string) {
  const problems = parseInput2(input);
  return sum(problems, solveProblem);
}

function parseInput(input: string): Problem[] {
  const rows = input.split('\n');
  // Swap columns to rows
  const valueRows = transpose(rows.map((row) => [...row.matchAll(/\S+/g)].flat()));
  return valueRows.map((row) => {
    // Example row: ['123', '45', '6', '*']
    return {
      numbers: row.slice(0, -1).map((v) => +v),
      operator: row.at(-1) as '+' | '*',
    };
  });
}

function parseInput2(input: string): Problem[] {
  const transposedInputArray = transpose(input.split('\n').map((row) => row.split('')));
  // Trim so that empty separator row is fully empty
  const transposedInput = transposedInputArray.map((row) => row.join('').trim()).join('\n');
  const problemInputs = transposedInput.split('\n\n');
  return problemInputs.map((problemInput) => {
    // Example input format as transposed:
    //  32*
    // 581
    // 175
    const numbers = parseNumbers(problemInput);
    const operator = problemInput.includes('+') ? '+' : '*';
    return {
      numbers,
      operator,
    };
  });
}

function solveProblem(problem: Problem) {
  if (problem.operator === '+') {
    return sum(problem.numbers, (v) => v);
  }
  if (problem.operator === '*') {
    return multiply(problem.numbers, (v) => v);
  }
  throw new Error(`Unknown operator: ${problem.operator}`);
}

function transpose<T>(array: T[][]) {
  return array[0].map((_row, x) => array.map((_value, y) => array[y][x]));
}
