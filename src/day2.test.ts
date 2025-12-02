import { describe, it } from '@std/testing/bdd';
import { expect } from '@std/expect';
import { part1, part2 } from './day2.ts';

const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`;

describe('day 2, part 1', () => {
  it('should work with test input', () => {
    expect(part1(input)).toBe(1227775554);
  });
});

describe('day 2, part 2', () => {
  it('should work with test input', () => {
    expect(part2(input)).toBe(4174379265);
  });
});
