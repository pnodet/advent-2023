const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const calculateCardPoints = (card: string): number => {
  const winningNumbers = new Set(
    card.split("|")[0].split(":")[1].trim().split(/\s+/).map(Number),
  );

  return card
    .split("|")[1]
    .trim()
    .split(" ")
    .map(Number)
    .reduce(
      (acc, number) =>
        winningNumbers.has(number) ? (acc === 0 ? 1 : acc * 2) : acc,
      0,
    );
};

const sum = input
  .trim()
  .split("\n")
  .reduce((acc, card) => acc + calculateCardPoints(card), 0);

console.log(sum);
