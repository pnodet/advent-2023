const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const [seedsLine, ...lines] = input.trim().split("\n\n");
const seeds = seedsLine.trim().split("seeds:")[1].trim().split(" ").map(Number);

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

const getValFromRanges = (
  val: number,
  ranges: [number, number, number][],
): number => {
  for (const [destinationStart, sourceStart, rangeLength] of ranges)
    if (val >= sourceStart && val < sourceStart + rangeLength)
      return destinationStart + (val - sourceStart);

  return val;
};

let min = Infinity;

for (const seed of seeds) {
  let transformedSeed = seed;
  for (const ranges of maps) {
    transformedSeed = getValFromRanges(transformedSeed, ranges);
  }
  min = Math.min(min, transformedSeed);
}

console.log(min);
