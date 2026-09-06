export function membershipEnd(start: string, unit: string, quantity: number, anchorDay?: number): string {
  const date = new Date(start.slice(0, 10) + 'T00:00:00Z');
  if (unit === 'Days') date.setUTCDate(date.getUTCDate() + quantity - 1);
  else {
    const day = anchorDay ?? date.getUTCDate();
    date.setUTCDate(1);
    date.setUTCMonth(date.getUTCMonth() + (unit === 'Years' ? quantity * 12 : quantity));
    const last = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
    date.setUTCDate(Math.min(day, last));
    date.setUTCDate(date.getUTCDate() - 1);
  }
  return date.toISOString().slice(0, 10);
}
export function nextDay(value: string): string {
  const date = new Date(value.slice(0, 10) + 'T00:00:00Z'); date.setUTCDate(date.getUTCDate() + 1); return date.toISOString().slice(0, 10);
}
