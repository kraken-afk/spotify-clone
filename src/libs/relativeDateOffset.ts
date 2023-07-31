export default function relativeDateOffset(date: string): string {
  const offset = new Date(date);
  const now = new Date();

  if (offset.getDate() === now.getDate()) {
    if (offset.getHours() === now.getHours()) {
      if (offset.getMinutes() === offset.getMinutes()) return `few seconds ago`;
      const diff = now.getMinutes() - offset.getMinutes();
      return `${diff} minute${diff > 1 ? "s" : ""} ago`;
    }
    const diff = now.getHours() - offset.getHours();
    return `${diff} hour${diff > 1 ? "s" : ""} ago`;
  }

  if (now.getFullYear() === offset.getFullYear() && now.getMonth() === offset.getMonth()) {
    const diff = now.getDate() - offset.getDate();
    if (diff < 7) return `${diff} day${diff > 1 ? "s" : ""} ago`;
    const week = Math.floor(diff / 7);
    return `${week} week${week > 1 ? "s" : ""} ago`;
  }

  return offset.toDateString().split(/\s/).slice(1).join(" ");
}
