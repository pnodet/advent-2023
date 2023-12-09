const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const getValues = (line: number[]) =>
  line.map((val, i, arr) => arr[i + 1] - val).slice(0, -1);

const sum = input
  .trim()
  .split("\n")
  .map((line) => line.split(" ").map(Number))
  .reduce((acc, line) => {
    const list = [line[line.length - 1]];
    let val = line;

    do {
      val = getValues(val);
      list.push(val[val.length - 1]);
    } while (!val.every((v) => v === val[0]));

    return acc + list.toReversed().reduce((acc, val) => acc + val);
  }, 0);

console.log(sum);
