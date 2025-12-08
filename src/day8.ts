// https://adventofcode.com/2025/day/8

import { multiply, parseNumbers } from './utils.ts';

interface Box {
  x: number;
  y: number;
  z: number;
}

export function part1(input: string, connections = 1000) {
  const coords = parseInput(input);
  const circuitMap = connectBoxes(coords, connections);
  const biggestCircuits = [...new Set(circuitMap.values())]
    .map((v) => v.length)
    .sort((a, b) => a - b)
    .slice(-3);
  return multiply(biggestCircuits, (v) => v);
}

export function part2(input: string) {
  const coords = parseInput(input);
  const { coord1, coord2 } = connectUntilConnected(coords);
  return coord1.x * coord2.x;
}

function parseInput(input: string): Box[] {
  return input
    .split('\n')
    .map((row, j) => {
      const [x, y, z] = parseNumbers(row);
      return { x, y, z, id: j };
    });
}

function getDistance(coord1: Box, coord2: Box) {
  return Math.sqrt((coord2.x - coord1.x) ** 2 + (coord2.y - coord1.y) ** 2 + (coord2.z - coord1.z) ** 2);
}

function connectBoxes(coords: Box[], connections: number) {
  const distancePairs = coords.flatMap((coord1, i) =>
    coords.slice(i + 1).map((coord2) => ({
      coord1,
      coord2,
      distance: getDistance(coord1, coord2),
    }))
  );
  // Descending order
  distancePairs.sort((a, b) => b.distance - a.distance);
  const circuitMap = new Map<Box, Box[]>();
  for (let i = 0; i < connections; i++) {
    const { coord1, coord2 } = distancePairs.pop()!;
    const circuit1 = circuitMap.get(coord1) ?? [coord1];
    const circuit2 = circuitMap.get(coord2) ?? [coord2];
    if (circuit1 === circuit2) {
      // Already connected
      continue;
    }
    if (circuit1.length === 1) {
      circuitMap.set(coord1, circuit1);
    }
    circuit1.push(...circuit2);
    for (const coord of circuit2) {
      circuitMap.set(coord, circuit1);
    }
  }
  return circuitMap;
}

function connectUntilConnected(coords: Box[]) {
  const distancePairs = coords.flatMap((coord1, i) =>
    coords.slice(i + 1).map((coord2) => ({
      coord1,
      coord2,
      distance: getDistance(coord1, coord2),
    }))
  );
  // Descending order
  distancePairs.sort((a, b) => b.distance - a.distance);
  const circuitMap = new Map<Box, Box[]>();
  while (true) {
    const { coord1, coord2 } = distancePairs.pop()!;
    const circuit1 = circuitMap.get(coord1) ?? [coord1];
    const circuit2 = circuitMap.get(coord2) ?? [coord2];
    if (circuit1 === circuit2) {
      // Already connected
      //i--;
      continue;
    }
    if (circuit1.length === 1) {
      circuitMap.set(coord1, circuit1);
    }
    circuit1.push(...circuit2);
    for (const coord of circuit2) {
      circuitMap.set(coord, circuit1);
    }
    if (circuit1.length === coords.length) {
      return { coord1, coord2 };
    }
  }
}
