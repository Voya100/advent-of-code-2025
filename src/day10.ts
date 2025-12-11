// https://adventofcode.com/2025/day/10

import { getCombinations, parseNumbers, sum } from './utils.ts';

export function part1(input: string) {
  const rows = parseInput(input);
  return sum(rows, ({ diagram, buttons }) => countPresses(diagram, buttons));
}

export function part2(input: string) {
  const rows = parseInput(input);
  return null;
}

function parseInput(input: string) {
  return input
    .split('\n')
    .map((row) => {
      const rowInputs = row.split(' ');
      const [diagramInput, ...buttonInputs] = rowInputs.slice(0, -1);
      const requirementInput = rowInputs.at(-1)!;
      return {
        diagram: diagramInput.slice(1, -1).split('').map((v) => v === '#'),
        buttons: buttonInputs.map(parseNumbers),
        requirements: parseNumbers(requirementInput),
      };
    });
}

function countPresses(diagram: boolean[], buttons: number[][]) {
  const diagramBinary = Number.parseInt(diagram.toReversed().map((b) => b ? 1 : 0).join(''), 2);
  const buttonBinaries = buttons.map((button) => sum(button, (v) => 2 ** v));
  const buttonCombinations = getCombinations(buttonBinaries);
  buttonCombinations.sort((a, b) => a.length - b.length);
  for (const binaryButtons of buttonCombinations) {
    const result = binaryButtons.reduce((result, button) => result ^ button, 0);
    if (result === diagramBinary) {
      return binaryButtons.length;
    }
  }
  throw new Error('Not found');
}
