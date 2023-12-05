const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const [seedsLine, ...lines] = input.trim().split("\n\n");
const seedsInput = seedsLine
  .trim()
  .split("seeds:")[1]
  .trim()
  .split(" ")
  .map(Number);

const maps = lines.map(
  (part) =>
    part
      .trim()
      .split("\n")
      .map((line) => line.trim().split(" ").map(Number)) as [
      number,
      number,
      number,
    ][],
);

const seeds = seedsInput
  .map((seed, i) => (i % 2 === 0 ? [seed, seed + seedsInput[i + 1] - 1] : null))
  .filter(Boolean) as [number, number][];

let parts = seeds.map(([from, to]) => [from, to]);

for (const ranges of maps) {
  const newParts = [];

  for (const part of parts) {
    let [start, end] = part;

    while (start <= end) {
      const range = ranges.find(
        (range) => start >= range[1] && start <= range[1] + range[2] - 1,
      );
      if (range) {
        const rangeEnd = Math.min(end, range[1] + range[2] - 1);
        newParts.push([
          start + range[0] - range[1],
          rangeEnd + range[0] - range[1],
        ]);
        start = rangeEnd + 1;
      } else {
        start++;
      }
    }
  }

  parts = newParts;
}

const min = Math.min(...parts.map((part) => part[0]));
console.log(min);
