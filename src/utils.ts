export function formatNumberToWon(value: number): string {
  return value.toLocaleString('ko-KR');
}

export function parseWonToNumber(value: string): number {
  return Number(value.replace(/,/g, ''));
}
