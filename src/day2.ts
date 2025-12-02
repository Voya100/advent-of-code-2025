// https://adventofcode.com/2025/day/2

import { getRange, sum } from './utils.ts';

export function part1(input: string) {
  const idRanges = parseInput(input);
  const invalidIds = idRanges.flatMap(({ start, end }) =>
    getRange(start, end).filter((id) => isInvalid(id.toString()))
  );
  return sum(invalidIds, (id) => id);
}

export function part2(input: string) {
  const idRanges = parseInput(input);
  const invalidIds = idRanges.flatMap(({ start, end }) =>
    getRange(start, end).filter((id) => isInvalid2(id.toString()))
  );
  return sum(invalidIds, (id) => id);
}

function parseInput(input: string) {
  return input
    .split(',')
    .map((row) => {
      const [start, end] = row.split('-');
      // Non-inclusive end
      return { start: +start, end: +end + 1 };
    });
}

function isInvalid(id: string) {
  const middle = Math.floor(id.length / 2);
  return id.slice(0, middle) === id.slice(middle, id.length);
}

function isInvalid2(id: string) {
  // Middle point is length of max pattern
  const middle = Math.floor(id.length / 2);
  for (let patternLength = 1; patternLength <= middle; patternLength++) {
    if (id.length % patternLength !== 0) {
      // Not divisible by pattern length
      continue;
    }
    // Could be more optimised by iterating indices instead of creating new strings,
    // but this is easier to read and performant enough
    const repeats = id.length / patternLength;
    if (id.slice(0, patternLength).repeat(repeats) === id) {
      return true;
    }
  }
  return false;
}
