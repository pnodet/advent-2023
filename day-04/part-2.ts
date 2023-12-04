const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const cards = input
  .trim()
  .split("\n")
  .map((card) => ({
    winningNumbers: new Set(card.split("|")[0].trim().split(/\s+/).map(Number)),
    yourNumbers: card.split("|")[1].trim().split(/\s+/).map(Number),
  }));

const countMatches = (card: (typeof cards)[number]) =>
  card.yourNumbers.reduce(
    (acc, number) => acc + (card.winningNumbers.has(number) ? 1 : 0),
    0,
  );

let sum = 0;
const queue = [...cards];

while (queue.length > 0) {
  // biome-ignore lint/style/noNonNullAssertion: bc queue.length > 0
  const currentCard = queue.shift()!;
  sum += 1;

  const matches = countMatches(currentCard);
  for (let i = 1; i <= matches; i++) {
    const nextCardIndex = cards.indexOf(currentCard) + i;
    if (nextCardIndex < cards.length) {
      queue.push(cards[nextCardIndex]);
    }
  }
}

console.log(sum);
