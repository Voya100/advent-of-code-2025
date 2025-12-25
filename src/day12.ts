// https://adventofcode.com/2025/day/12

import { Coordinate, getRange, sum } from './utils.ts';
import { parseNumbers } from './utils.ts';

export function part1(input: string) {
  const { presents, regions } = parseInput(input);
  const possibleRegions = regions.filter((region) => {
    // Remove all impossible cases by required minimum space
    // Real input does not require "stacking"
    const regionPresents = region.quantities.map((count, i) => ({ count, present: presents[i] }))
      .filter(({ count }) => count > 0);
    if (
      presents.flatMap((present) => present.shapes.flatMap((shape) => shape)).some((coord) => coord.x > region.width)
    ) {
      return false;
    }
    if (
      presents.flatMap((present) => present.shapes.flatMap((shape) => shape)).some((coord) => coord.y > region.height)
    ) {
      return false;
    }
    const requiredSize = sum(regionPresents, (present) => present.count * present.present.shapes.length);
    const size = region.height * region.width;
    return requiredSize < size;
  });
  return possibleRegions.length;
}

export function part2(input: string) {
  return '';
}

function parseInput(input: string) {
  const sectionsInputs = input.split('\n\n');
  const regionInput = sectionsInputs.pop()!;

  return {
    regions: regionInput.split('\n').map(parseRegion),
    presents: sectionsInputs.map(parsePresent),
  };
}

function parsePresent(sectionInput: string) {
  const id = parseNumbers(sectionInput);
  const rows = sectionInput.split('\n').slice(1);
  const shapes: Coordinate[] = getRange(0, rows.length).flatMap((y) =>
    getRange(0, rows[0].length).map((x) => ({ y, x }))
  )
    .filter(({ x, y }) => rows[y][x] === '#');
  return {
    id,
    shapes,
  };
}

function parseRegion(regionInput: string) {
  const [sizeInput, quantityInput] = regionInput.split(': ');
  const [width, height] = parseNumbers(sizeInput);
  const quantities = parseNumbers(quantityInput);
  return {
    width,
    height,
    quantities,
  };
}
