import { describe, it } from '@std/testing/bdd';
import { expect } from '@std/expect';
import { part1, part2 } from './day1.ts';

const input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

describe('day 1, part 1', () => {
  it('should work with test input', () => {
    expect(part1(input)).toBe(3);
  });
});

describe('day 1, part 2', () => {
  it('should work with test input', () => {
    expect(part2(input)).toBe(6);
  });
});
