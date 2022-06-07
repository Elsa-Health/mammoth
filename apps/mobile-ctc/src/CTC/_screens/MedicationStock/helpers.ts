// ll-fns
// ----------------

export function groupByFn<G extends string | number, A, O = [G, A]>(
  data: A[],
  fn: (item: A) => G,
  output?: (group: G, rows: A[]) => O,
) {
  const groups = new Map<G, Set<A>>();
  const _ofn = output === undefined ? (id: G, d: A[]) => [id, d] : output;

  data.forEach(item => {
    const gp = fn(item);

    if (!groups.has(gp)) {
      groups.set(gp, new Set());
    }

    const s = groups.get(gp) as Set<A>;
    s.add(item);
  });

  return Array.from(groups.entries()).map(([id, set]) => {
    return _ofn(id, Array.from(set.values()));
  });
}

export function array(iter: any) {
  return Array.from(iter);
}

export const gKeys = <G extends string, A>(data: [G, A][]) =>
  data.map(s => s[0]);
export const gValues = <G extends string, A>(data: [G, A][]) =>
  data.map(s => s[1]);

export const count = (arr: any[]) => arr.length;

/**
 * Compute median average of numbers
 * @param arr
 * @returns
 */
export const median = (arr: number[]) => {
  if (count(arr) < 3) {
    return mean(arr);
  }

  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

/**
 * Compute mean average of numbers
 * @param arr
 * @returns
 */
export const mean = (arr: number[]) => {
  if (count(arr) <= 0) {
    return 0;
  }

  return sum(arr) / count(arr);
};

export const sum = (arr: number[]) => {
  let _sum = 0;
  for (let x of arr) {
    _sum += x;
  }

  return _sum;
};
