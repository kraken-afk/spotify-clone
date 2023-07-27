export default function msToTime(ms: number): string {
  if (ms <= 0) throw new TypeError("ms cannot be equal or below zero!");

  let second: number = +(ms / 1000).toFixed();
  let minute: number = 0;
  let hour: number = 0;

  while (second > 60) {
    second -= 60;
    minute++;
  }

  while (minute > 60) {
    minute -= 60;
    hour++;
  }

  if (second) {
    second = 0;
    minute++;
  }

  let result: string = "";

  if (hour) result = result.concat(`${hour} hr${hour === 1 ? "" : "s"} `);

  if (minute) result = result.concat(`${minute} min${minute === 1 ? "" : "s"} `);

  console.log(result);

  return result;
}
