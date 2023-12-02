const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const max: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

const sum = input
  .trim()
  .split("\n")
  .reduce((acc, line) => {
    const [gameid, draws] = line.split(": ");
    const id = parseInt(gameid.split(" ")[1]);

    return draws.split(/; /g).some((subsets) =>
      subsets.split(/, /g).some((subset) => {
        const [nmbr, color] = subset.trim().split(" ");
        return parseInt(nmbr) > max[color];
      }),
    )
      ? acc
      : acc + id;
  }, 0);

console.log(sum);
