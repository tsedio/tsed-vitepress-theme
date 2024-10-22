export function formatNumber(value: number) {
  return new Intl.NumberFormat(undefined, {
    notation: "compact",
    compactDisplay: "short"
  }).format(value || 0);
}
