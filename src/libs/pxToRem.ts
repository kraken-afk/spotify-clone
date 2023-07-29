export default function pxToRem(px: number): number {
  return +(px / 16).toFixed(3);
}