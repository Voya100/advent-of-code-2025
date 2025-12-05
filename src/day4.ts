// https://adventofcode.com/2025/day/4

import { Coordinate, getAdjacentCoordinates, getRange } from './utils.ts';

const ROLL = '@';
const EMPTY = '.';

export function part1(input: string) {
  const grid = parseInput(input);
  const coordinates = getRange(0, grid.length)
    .flatMap((y) => getRange(0, grid[0].length).map((x) => ({ x, y })));
  const accessibleCoordinates = coordinates.filter((coord) => isAccessible(grid, coord));
  return accessibleCoordinates.length;
}

export function part2(input: string) {
  const grid = parseInput(input);
  const coordinates = getRange(0, grid.length)
    .flatMap((y) => getRange(0, grid[0].length).map((x) => ({ x, y })));
  let accessibleCoordinates = coordinates.filter((coord) => isAccessible(grid, coord));
  let totalAccessibleCoordinates = 0;
  while (accessibleCoordinates.length) {
    totalAccessibleCoordinates += accessibleCoordinates.length;
    for (const coord of accessibleCoordinates) {
      grid[coord.y][coord.x] = EMPTY;
    }
    accessibleCoordinates = coordinates.filter((coord) => isAccessible(grid, coord));
  }
  return totalAccessibleCoordinates;
}

function parseInput(input: string) {
  return input
    .split('\n')
    .map((row) => row.split(''));
}

function isAccessible(grid: string[][], coord: Coordinate) {
  if (grid[coord.y][coord.x] !== ROLL) {
    return false;
  }
  const adjacentCoordinates = getAdjacentCoordinates(coord);
  return adjacentCoordinates.filter((coord) => grid[coord.y]?.[coord.x] === ROLL).length < 4;
}
