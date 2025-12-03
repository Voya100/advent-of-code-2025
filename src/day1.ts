// https://adventofcode.com/2025/day/1

export function part1(input: string) {
  const directions = parseInput(input);
  let dial = 50;
  let password = 0;
  for (const direction of directions) {
    dial += direction;
    if (dial % 100 === 0) {
      password++;
    }
  }
  return password;
}

export function part2(input: string) {
  const directions = parseInput(input);
  let dial = 50;
  let password = 0;
  // Note: Not optimised for large values.
  // Input values are small, so using simple algorithm
  for (const direction of directions) {
    const sign = direction < 0 ? -1 : 1;
    for (let i = 0; i < Math.abs(direction); i++) {
      dial += sign;
      if (dial % 100 === 0) {
        password++;
      }
    }
  }
  return password;
}

function parseInput(input: string) {
  return input
    .split('\n')
    .map((row) => row.startsWith('L') ? -row.slice(1) : +row.slice(1));
}
