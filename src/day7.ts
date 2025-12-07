// https://adventofcode.com/2025/day/7

const START = 'S';
const SPLITTER = '^';

interface Splitter {
  x: number;
  y: number;
  active: boolean;
  timelines?: number;
  left?: Splitter;
  right?: Splitter;
}

export function part1(input: string) {
  const { splitters } = parseInput(input);
  return splitters.filter((splitter) => splitter.active).length;
}

export function part2(input: string) {
  const { start } = parseInput(input);
  return countTimelines(start);
}

function parseInput(input: string) {
  const grid: (Splitter | null)[][] = input
    .split('\n')
    .map((row, y) =>
      row.split('').map((value, x) => {
        if (value !== SPLITTER) {
          return null;
        }
        return {
          x,
          y,
          active: false,
        };
      })
    );
  const splitters = grid.flat().filter((v) => v !== null);
  for (const splitter of splitters) {
    populateLeftAndRight(splitter, grid);
  }
  // Assuming start is on first row
  const startX = input.indexOf(START);
  const start = grid.find((row) => row[startX])![startX]!;
  populateSplitterActivity(start);
  return { start, splitters };
}

function populateLeftAndRight(splitter: Splitter, grid: (Splitter | null)[][]) {
  for (let y = splitter.y + 1; y < grid.length; y++) {
    const left = grid[y][splitter.x - 1];
    if (left) {
      splitter.left = left;
      break;
    }
  }
  for (let y = splitter.y + 1; y < grid.length; y++) {
    const right = grid[y][splitter.x + 1];
    if (right) {
      splitter.right = right;
      break;
    }
  }
}

function populateSplitterActivity(start: Splitter) {
  if (start.active) {
    return;
  }
  start.active = true;
  if (start.left) {
    populateSplitterActivity(start.left);
  }
  if (start.right) {
    populateSplitterActivity(start.right);
  }
}

function countTimelines(start: Splitter | undefined): number {
  if (!start) {
    // Leaf node
    return 1;
  }
  if (start.timelines) {
    // Memoisation
    return start.timelines;
  }
  const left = countTimelines(start.left);
  const right = countTimelines(start.right);
  start.timelines = left + right;
  return start.timelines;
}
