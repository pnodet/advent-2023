const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const [times, distances] = input
  .trim()
  .split("\n")
  .map((line) => line.trim().split(": ")[1].trim().split(/\s+/).map(Number));

const result = times
  .map((time, i) => {
    const x = Math.floor((time - Math.sqrt(time ** 2 - 4 * distances[i])) / 2);
    const y = Math.floor((time + Math.sqrt(time ** 2 - 4 * distances[i])) / 2);
    return y - x;
  })
  .reduce((a, b) => a * b, 1);

console.log(result);
