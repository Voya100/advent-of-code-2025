// https://adventofcode.com/2025/day/9

import { Coordinate, getAllPairs, parseNumbers } from './utils.ts';

export function part1(input: string) {
  const tiles = parseInput(input);
  const areas = getAllPairs(tiles).map(([tile1, tile2]) => getArea(tile1, tile2));
  return areas.reduce((prev, curr) => Math.max(prev, curr));
}

export function part2(input: string) {
  const v = parseInput(input);
  return '';
}

function parseInput(input: string) {
  return input
    .split('\n')
    .map((row) => {
      const [x, y] = parseNumbers(row);
      return { x, y };
    });
}

function getArea(coord1: Coordinate, coord2: Coordinate) {
  return (Math.abs(coord2.x - coord1.x) + 1) * (Math.abs(coord2.y - coord1.y) + 1);
}
