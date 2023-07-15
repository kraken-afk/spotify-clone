export default function greetTime(): string {
  const time = new Date();
  const hours = time.getHours();

  if (hours >= 5 && hours < 12)
    return "Good morning";
  else if (hours >= 12 && hours < 18)
    return "Good afternoon";
  else
    return "Good evening";
}