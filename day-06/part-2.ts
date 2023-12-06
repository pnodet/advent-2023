const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const [time, distance] = input
  .trim()
  .split("\n")
  .map((line) => line.trim().split(": ")[1].trim().split(/\s+/).join(""))
  .map(Number);

const x = Math.floor((time - Math.sqrt(time ** 2 - 4 * distance)) / 2);
const y = Math.floor((time + Math.sqrt(time ** 2 - 4 * distance)) / 2);
const count = y - x;

console.log(count);
