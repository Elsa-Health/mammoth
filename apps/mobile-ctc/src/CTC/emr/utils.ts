export function removeWhiteSpace(text: string) {
  return text.replace(/\s+/g, '').trim();
}

export function lower(text: string) {
  return text.toLowerCase();
}
