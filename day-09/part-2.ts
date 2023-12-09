const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const getValues = (line: number[]) =>
  line.map((val, i, arr) => arr[i + 1] - val).slice(0, -1);

const sum = input
  .trim()
  .split("\n")
  .map((line) => line.split(" ").map(Number))
  .reduce((acc, line) => {
    const list = [line[0]];
    let val = line;

    do {
      val = getValues(val);
      list.push(val[0]);
    } while (!val.every((v) => v === val[0]));

    const toAdd = list
      .toReversed()
      .reduce(
        (listAcc, current, i) => (i === 0 ? current : current - listAcc),
        0,
      );

    return acc + toAdd;
  }, 0);

console.log(sum);
