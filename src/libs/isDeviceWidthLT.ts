export default function isDeviceWidthLT(px: number): boolean {
  const deviceWidth = window.innerWidth;

  return deviceWidth < px;
}
