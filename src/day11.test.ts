import { describe, it } from '@std/testing/bdd';
import { expect } from '@std/expect';
import { part1, part2 } from './day11.ts';

const input = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`;

const input2 = `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`;

describe('day 11, part 1', () => {
  it('should work with test input', () => {
    expect(part1(input)).toBe(5);
  });
});

describe('day 11, part 2', () => {
  it('should work with test input', () => {
    expect(part2(input2)).toBe(2);
  });
});
