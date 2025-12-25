import { describe, it } from '@std/testing/bdd';
import { expect } from '@std/expect';
import { part1, part2 } from './day9.ts';

const input = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

describe('day 9, part 1', () => {
  it('should work with test input', () => {
    expect(part1(input)).toBe(50);
  });
});

describe('day 9, part 2', () => {
  it('should work with test input', () => {
    expect(part2(input)).toBe(24);
  });
});
