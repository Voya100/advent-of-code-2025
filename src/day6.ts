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
  console.log(problems);
  return sum(problems, solveProblem);
}

function parseInput(input: string): Problem[] {
  const rows = input.split('\n');
  const operationInput = rows.pop()!;
  const numberRows = rows.map(parseNumbers);
  const operators = [...operationInput.matchAll(/[*+]/g)].map((v) => v[0] as '+' | '*');
  const problems = operators.map((operator, i) => {
    const numbers: number[] = [];
    for (const row of numberRows) {
      numbers.push(row[i]);
    }
    return { operator, numbers };
  });
  return problems;
}

function parseInput2(input: string): Problem[] {
  const rows = input.split('\n');
  const operationInput = rows.pop()!;
  const problems: Problem[] = [];
  // Indices between which current operation's values are
  // Note: Assuming that operator symbol is at index '0' compared to its numbers,
  // and that there is exactly 1 empty column between problems
  // E.g.
  // 123 12 2
  // 23   1 23
  // +   *  +
  let i1 = 0;
  let i2 = 1 + operationInput.slice(1).search(/[+*]/);
  while (i2 !== -1 && i1 !== i2) {
    const numbers: number[] = [];
    for (let j = i2 - 2; j >= i1; j--) {
      let numberStr = '';
      for (const row of rows) {
        if (row[j] !== undefined) {
          numberStr += row[j];
        }
      }
      numbers.push(+numberStr);
    }
    problems.push({
      operator: operationInput[i1] as '+' | '*',
      numbers,
    });
    i1 = i2;
    const nextOperationIndex = operationInput.slice(i2 + 1).search(/[+*]/);
    if (nextOperationIndex === -1) {
      i2 = operationInput.length + 1;
    } else {
      i2 = i2 + 1 + operationInput.slice(i2 + 1).search(/[+*]/);
    }
  }
  return problems;
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
