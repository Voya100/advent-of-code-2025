import { describe, it } from '@std/testing/bdd';
import { expect } from '@std/expect';
import { part1, part2 } from './day4.ts';

const input = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

describe('day 4, part 1', () => {
  it('should work with test input', () => {
    expect(part1(input)).toBe(13);
  });
});

describe('day 4, part 2', () => {
  it('should work with test input', () => {
    expect(part2(input)).toBe(43);
  });
});
