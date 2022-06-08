export function removeWhiteSpace(text: string) {
  return text.replace(/\s+/g, '').trim();
}

export function lower(text: string) {
  return text.toLowerCase();
}

export function convertDMYToDate(date: DDMMYYYYDateString): Date {
  const vals = removeWhiteSpace(date).split('/');

  if (vals.length !== 3) {
    throw new Error(
      'Invalid data format. The date needs to be in the formate DD / MM / YYYY',
    );
  }

  try {
    const [d, m, y] = vals;
    return new Date(`${y}-${m}-${d}`);
  } catch (err) {
    throw new Error('Unable to parse the number into a proper Date object');
  }
}
