/**
 * Fisher-Yates shuffle. Returns a new array, does not mutate the input.
 */
export function shuffle<T>(input: T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Pick a single random element from an array.
 */
export function pickRandom<T>(input: T[]): T {
  return input[Math.floor(Math.random() * input.length)];
}

/**
 * Pick `count` unique random indices in the range [0, size).
 * Used to select which players become imposters.
 */
export function pickUniqueIndices(size: number, count: number): number[] {
  const indices = Array.from({ length: size }, (_, i) => i);
  return shuffle(indices).slice(0, Math.min(count, size));
}

/**
 * Assign `count` unique random items from `pool` (used for avatars).
 * If count exceeds the pool size, items are reused (still shuffled).
 */
export function assignUnique<T>(pool: T[], count: number): T[] {
  if (count <= pool.length) {
    return shuffle(pool).slice(0, count);
  }
  // Not enough unique items — cycle through shuffled pool repeatedly.
  const result: T[] = [];
  while (result.length < count) {
    result.push(...shuffle(pool));
  }
  return result.slice(0, count);
}
