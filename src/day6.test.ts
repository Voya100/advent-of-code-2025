import { describe, it } from '@std/testing/bdd';
import { expect } from '@std/expect';
import { part1, part2 } from './day6.ts';

const input = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

describe('day 6, part 1', () => {
  it('should work with test input', () => {
    expect(part1(input)).toBe(4277556);
  });
});

describe('day 6, part 2', () => {
  it('should work with test input', () => {
    expect(part2(input)).toBe(3263827);
  });
});
