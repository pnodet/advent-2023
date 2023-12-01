const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const WORDS_TO_DIGITS: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const NUMBERS = [
  ...Object.keys(WORDS_TO_DIGITS),
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
];

const sum = input
  .trim()
  .split("\n")
  .reduce((acc, line) => {
    let first = "";
    let last = "";
    let firstIdx = line.length - 1;
    let lastIdx = 0;

    for (const n of NUMBERS) {
      let i = line.indexOf(n);

      if (i !== -1 && i <= firstIdx) {
        firstIdx = i;
        first = n;
      }

      i = line.lastIndexOf(n);
      if (i >= lastIdx) {
        lastIdx = i;
        last = n;
      }
    }

    const numValue = Number(
      `${WORDS_TO_DIGITS[first] || first}${WORDS_TO_DIGITS[last] || last}`,
    );
    return acc + numValue;
  }, 0);

console.log(sum);
