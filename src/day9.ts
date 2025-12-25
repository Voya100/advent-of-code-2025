// https://adventofcode.com/2025/day/9

import { Coordinate, getAllPairs, parseNumbers } from './utils.ts';

const UP = '^';
const DOWN = 'v';
const LEFT = '<';
const RIGHT = '>';

type Direction = typeof UP | typeof DOWN | typeof RIGHT | typeof LEFT;

interface Line {
  start: Coordinate;
  end: Coordinate;
}

export function part1(input: string) {
  const tiles = parseInput(input);
  const areas = getAllPairs(tiles).map(([tile1, tile2]) => getArea(tile1, tile2));
  return areas.reduce((prev, curr) => Math.max(prev, curr));
}

export function part2(input: string) {
  const coords = parseInput(input);
  // Outer walls
  const walls = getWalls(coords);
  const pairs = getAllPairs(coords);
  // Coordinate pair is not possible if area between them overlaps with any of the outer walls
  const possiblePairs = pairs.filter((pair) => !walls.some((wall) => lineCrossesArea(wall, pair[0], pair[1])));
  const areas = possiblePairs.map(([tile1, tile2]) => getArea(tile1, tile2));
  return areas.reduce((prev, curr) => Math.max(prev, curr));
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

/**
 * Returns outer walls around coordinates.
 * Assumes connections between coordinates are not right next to each other
 * (e.g. there is enough coordinate space for walls between adjacent)
 * Assumes that there is always 90 degree turn on each coordinate.
 * If this would not be the case, it would be possible to scale coordinate space by 2,
 * but this is not needed here.
 */
function getWalls(coords: Coordinate[]) {
  const walls: Line[] = [];

  const minY = Math.min(...coords.map((coord) => coord.y));

  const topLeft = coords.filter((coord) => coord.y === minY).sort((a, b) => a.x - b.x)[0];
  const startIndex = coords.indexOf(topLeft);
  const orderedCoords = [...coords.slice(startIndex + 1), ...coords.slice(0, startIndex + 1)];

  let wallDir: Direction = RIGHT;
  let wallCoord = {
    x: topLeft.x,
    y: topLeft.y - 1,
  };
  for (let i = 0; i < orderedCoords.length; i++) {
    const coord1 = orderedCoords[i];
    const coord2 = orderedCoords[(i + 1) % orderedCoords.length];
    const nextWallCoord = { ...wallCoord };
    switch (wallDir) {
      case '^': {
        if (wallCoord.x < coord1.x) {
          if (coord2.x < coord1.x) {
            nextWallCoord.y = coord1.y + 1;
            wallDir = LEFT;
          } else {
            nextWallCoord.y = coord1.y - 1;
            wallDir = RIGHT;
          }
        } else {
          if (coord2.x > coord1.x) {
            nextWallCoord.y = coord1.y - 1;
            wallDir = RIGHT;
          } else {
            nextWallCoord.y = coord1.y + 1;
            wallDir = LEFT;
          }
        }
        break;
      }
      case 'v': {
        if (wallCoord.x > coord1.x) {
          if (coord2.x > coord1.x) {
            nextWallCoord.y = coord1.y - 1;
            wallDir = RIGHT;
          } else {
            nextWallCoord.y = coord1.y + 1;
            wallDir = LEFT;
          }
        } else {
          if (coord2.x < coord1.x) {
            nextWallCoord.y = coord1.y - 1;
            wallDir = RIGHT;
          } else {
            nextWallCoord.y = coord1.y + 1;
            wallDir = LEFT;
          }
        }
        break;
      }
      case '>': {
        if (wallCoord.y > coord1.y) {
          if (coord2.y > coord1.y) {
            nextWallCoord.x = coord1.x - 1;
            wallDir = DOWN;
          } else {
            nextWallCoord.x = coord1.x + 1;
            wallDir = UP;
          }
        } else {
          if (coord2.y > coord1.y) {
            nextWallCoord.x = coord1.x + 1;
            wallDir = DOWN;
          } else {
            nextWallCoord.x = coord1.x - 1;
            wallDir = UP;
          }
        }
        break;
      }
      case '<': {
        if (wallCoord.y > coord1.y) {
          if (coord2.y > coord1.y) {
            nextWallCoord.x = coord1.x + 1;
            wallDir = DOWN;
          } else {
            nextWallCoord.x = coord1.x - 1;
            wallDir = UP;
          }
        } else {
          if (coord2.y > coord1.y) {
            nextWallCoord.x = coord1.x - 1;
            wallDir = DOWN;
          } else {
            nextWallCoord.x = coord1.x + 1;
            wallDir = UP;
          }
        }
        break;
      }
    }
    walls.push({ start: wallCoord, end: nextWallCoord });
    wallCoord = nextWallCoord;
  }
  return walls;
}

function lineCrossesArea(line: Line, coord1: Coordinate, coord2: Coordinate) {
  // AABB collision check
  const minX1 = Math.min(line.start.x, line.end.x);
  const minY1 = Math.min(line.start.y, line.end.y);
  const maxX1 = Math.max(line.start.x, line.end.x);
  const maxY1 = Math.max(line.start.y, line.end.y);

  const minX2 = Math.min(coord1.x, coord2.x);
  const minY2 = Math.min(coord1.y, coord2.y);
  const maxX2 = Math.max(coord1.x, coord2.x);
  const maxY2 = Math.max(coord1.y, coord2.y);
  return maxX1 >= minX2 && maxX2 >= minX1 && maxY1 >= minY2 && maxY2 >= minY1;
}
