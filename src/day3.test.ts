import { describe, it } from '@std/testing/bdd';
import { expect } from '@std/expect';
import { part1, part2 } from './day3.ts';

const input = `987654321111111
811111111111119
234234234234278
818181911112111`;

describe('day 3, part 1', () => {
  it('should work with test input', () => {
    expect(part1(input)).toBe(357);
  });
});

describe('day 3, part 2', () => {
  it('should work with test input', () => {
    expect(part2(input)).toBe(3121910778619);
  });
});
