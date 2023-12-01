const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const sum = input
  .trim()
  .split("\n")
  .reduce((acc, line) => {
    const numbers = line.match(/\d+/g) || [];
    const first = numbers[0] || "0";
    const last = numbers[numbers.length - 1] || first;
    return acc + Number(`${first[0]}${last[last.length - 1]}`);
  }, 0);

console.log(sum);
