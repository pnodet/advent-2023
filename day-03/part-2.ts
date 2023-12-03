const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const rows = input.trim().split("\n");
const height = rows.length;
const width = rows[0].length;

const isDigit = (char: string) => /\d/.test(char);

const getAdjacent = (x: number, y: number, pos: Set<string>) => {
  const partNumbers: number[] = [];
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
        isDigit(rows[ny][nx])
      ) {
        let numStart = nx;
        while (numStart > 0 && isDigit(rows[ny][numStart - 1])) {
          numStart--;
        }

        const positionKey = `${ny},${numStart}`;
        if (pos.has(positionKey)) continue;

        const match = rows[ny].substring(numStart).match(/^\d+/);
        if (match) {
          partNumbers.push(parseInt(match[0]));
          pos.add(positionKey);
        }
      }
    }
  }

  return partNumbers;
};

const sum = rows.reduce((total, row, y) => {
  const pos = new Set<string>();
  return (
    total +
    row.split("").reduce((acc, char, x) => {
      if (char === "*") {
        const adjacentNbrs = getAdjacent(x, y, pos);
        if (adjacentNbrs.length === 2) {
          return acc + adjacentNbrs[0] * adjacentNbrs[1];
        }
      }
      return acc;
    }, 0)
  );
}, 0);

console.log(sum);
