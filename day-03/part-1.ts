const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const rows = input.trim().split("\n");
const height = rows.length;
const width = rows[0].length;

const isSymbol = (char: string) => !/[.\d]/.test(char);

const isAdjacent = (x: number, y: number) => {
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (
        nx >= 0 &&
        nx < width &&
        ny >= 0 &&
        ny < height &&
        isSymbol(rows[ny][nx])
      ) {
        return true;
      }
    }
  }
  return false;
};

const sum = rows.reduce(
  (acc, row, y) =>
    [...row.matchAll(/\d+/g)].reduce((rowSum, match) => {
      const x = match.index || 0;
      for (let i = 0; i < match[0].length; i++)
        if (isAdjacent(x + i, y)) {
          return rowSum + parseInt(match[0]);
        }
      return rowSum;
    }, acc),
  0,
);

console.log(sum);
