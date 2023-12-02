const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const sum = input
  .trim()
  .split("\n")
  .reduce((totalSum, line) => {
    const draws = line.split(": ")[1];
    const map = new Map<string, number>();

    for (const subsets of draws.split(/; /g)) {
      for (const subset of subsets.split(/, /g)) {
        const [nmbr, color] = subset.trim().split(" ");
        map.set(color, Math.max(map.get(color) ?? 0, Number(nmbr)));
      }
    }

    return totalSum + [...map.values()].reduce((acc, value) => acc * value, 1);
  }, 0);

console.log(sum);
