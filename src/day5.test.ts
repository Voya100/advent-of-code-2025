import { describe, it } from '@std/testing/bdd';
import { expect } from '@std/expect';
import { part1, part2 } from './day5.ts';

const input = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

describe('day 5, part 1', () => {
  it('should work with test input', () => {
    expect(part1(input)).toBe(3);
  });
});

describe('day 5, part 2', () => {
  it('should work with test input', () => {
    expect(part2(input)).toBe(14);
  });
});
