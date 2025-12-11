import { describe, it } from '@std/testing/bdd';
import { expect } from '@std/expect';
import { part1, part2 } from './day10.ts';

const input = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;

describe('day 10, part 1', () => {
  it('should work with test input', () => {
    expect(part1(input)).toBe(7);
  });
});

describe('day 10, part 2', () => {
  it('should work with test input', () => {
    expect(part2(input)).toBe(33);
  });
});
