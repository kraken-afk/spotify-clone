export default class SpotifyDatasManager {

  public set<T = unknown>(key: string, value: T): void {
    if (typeof value !== "object")
      throw new TypeError("value must be type of object");

    localStorage.setItem(key, JSON.stringify(value));
  }

  public get<T = unknown>(key: string): T {
    return JSON.parse(localStorage[key]) as T;
  }

  public map<T = unknown, K = unknown>(key: string, callback: (value: T) => K): K {
    const data = JSON.parse(localStorage[key]) as T;
    return (callback(data) as K);
  }
}
