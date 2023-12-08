const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const [instructions, ...lines_] = input.trim().split("\n\n");

const orders = instructions.split("");
const lines = new Map(
  lines_
    .join("")
    .split("\n")
    .map((line) => {
      const [key, value] = line.split(" = ");
      return [key, value.slice(1, -1).split(", ")] as [string, string[]];
    }),
);

const currentKey = "AAA";

const solve = (key: string) => {
  let steps = 0;
  let currentKey = key;

  while (currentKey[2] !== "Z") {
    const order = orders[steps % orders.length];
    currentKey = lines.get(currentKey)![order === "L" ? 0 : 1];
    steps++;
  }

  return steps;
};

console.log(solve(currentKey));
