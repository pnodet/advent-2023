const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const CARDS: Record<string, number> = {
  A: 14,
  K: 13,
  Q: 12,
  J: 1,
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

const updateMapForJokers = (
  handData: [string, Map<string, number>, number],
  cardNotJoker: string,
) => {
  const jokerCount = handData[1].get("J") ?? 0;
  const cardCount = handData[1].get(cardNotJoker) ?? 0;
  return new Map(
    Array.from(handData[1]).map(([card, count]) =>
      card === "J" || card === cardNotJoker
        ? [cardNotJoker, jokerCount + cardCount]
        : [card, count],
    ),
  );
};

const getGreatestCardNotJoker = (map: Map<string, number>) =>
  [...map.entries()]
    .toSorted((a, b) => b[1] - a[1])
    .filter(([card]) => card !== "J")[0]?.[0];

const sorted = hands.toSorted((a_, b_) => {
  const a: [string, Map<string, number>, number] = a_[0].includes("J")
    ? [a_[0], updateMapForJokers(a_, getGreatestCardNotJoker(a_[1])), a_[2]]
    : a_;
  const b: [string, Map<string, number>, number] = b_[0].includes("J")
    ? [b_[0], updateMapForJokers(b_, getGreatestCardNotJoker(b_[1])), b_[2]]
    : b_;

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
