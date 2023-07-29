export enum TimeConverterEnum {
  DURATION = "duration",
  ESTIMATE = "estimate",
}

export default function msToTime(ms: number, type?: TimeConverterEnum): string {
  if (ms <= 0) throw new TypeError("ms cannot be equal or below zero!");

  let second: number = +(ms / 1000).toFixed();
  let minute: number = 0;
  let hour: number = 0;

  while (second >= 60) {
    second -= 60;
    minute++;
  }

  while (minute >= 60) {
    minute -= 60;
    hour++;
  }

  let result: string = "";

  if (type === TimeConverterEnum.DURATION) {
    if (hour > 0) {
      result = `${hour.toString()}:${minute.toString().padStart(2, "0")}:${second
        .toString()
        .padStart(2, "0")}`;
    } else {
      result = `${minute.toString()}:${second.toString().padStart(2, "0")}`;
    }
  } else {
    if (hour) result = result.concat(`${hour} hr${hour === 1 ? "" : "s"} `);
    if (minute) result = result.concat(`${minute} min${minute === 1 ? "" : "s"} `);
  }

  return result.trim();
}
