const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const CARDS: Record<string, number> = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
};

const hands = input
  .trim()
  .split("\n")
  .map((line) => line.trim().split(/\s+/))
  .map(
    ([hand, bid]) =>
      [
        hand,
        hand.split("").reduce((map, card) => {
          map.set(card, (map.get(card) || 0) + 1);
          return map;
        }, new Map<string, number>()),
        Number(bid),
      ] as [string, Map<string, number>, number],
  );

const getHighestCard = (handA: string[], handB: string[]): number =>
  (CARDS[handA[0]] || Number(handA[0])) ===
  (CARDS[handB[0]] || Number(handB[0]))
    ? getHighestCard(handA.slice(1), handB.slice(1))
    : (CARDS[handA[0]] || Number(handA[0])) -
      (CARDS[handB[0]] || Number(handB[0]));

const sortCards = (map: Map<string, number>) =>
  [...map.entries()].toSorted((a, b) => b[1] - a[1]);

const sorted = hands.toSorted((a, b) => {
  const topA = sortCards(a[1])[0][1];
  const topB = sortCards(b[1])[0][1];

  if (topA !== topB) return topA - topB;

  const secondTopA = sortCards(a[1])[1]?.[1] ?? 0;
  const secondTopB = sortCards(b[1])[1]?.[1] ?? 0;

  if ((topA === 2 || topA === 3) && secondTopA !== secondTopB) {
    return secondTopA - secondTopB;
  }

  return getHighestCard(a[0].split(""), b[0].split(""));
});

const sum = sorted.reduce(
  (acc, [, , bid], index) => acc + bid * (index + 1),
  0,
);

console.log(sum);
