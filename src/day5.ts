// https://adventofcode.com/2025/day/5

import { parseNumbers, sum } from './utils.ts';

interface Range {
  start: number;
  end: number;
}

export function part1(input: string) {
  const { freshIdRanges, ids } = parseInput(input);
  const validIds = ids.filter((id) => freshIdRanges.some(({ start, end }) => start <= id && id <= end));
  return validIds.length;
}

export function part2(input: string) {
  const { freshIdRanges } = parseInput(input);
  return countIds(freshIdRanges);
}

function parseInput(input: string) {
  const [rangeInput, idInput] = input.split('\n\n');
  const freshIdRanges = rangeInput.split('\n').map((row) => {
    const [start, end] = row.split('-');
    return {
      start: +start,
      end: +end,
    };
  });
  const ids = parseNumbers(idInput);
  return {
    freshIdRanges,
    ids,
  };
}

function countIds(idRanges: Range[]) {
  idRanges = idRanges.toSorted((a, b) => a.start - b.start);
  const combinedRanges: Range[] = [];
  let nextRange = { ...idRanges[0] };
  for (const range of idRanges.slice(1)) {
    if (range.start > nextRange.end + 1) {
      combinedRanges.push(nextRange);
      nextRange = { ...range };
    } else {
      nextRange.end = Math.max(nextRange.end, range.end);
    }
  }
  combinedRanges.push(nextRange);
  return sum(combinedRanges, (range) => range.end - range.start + 1);
}
