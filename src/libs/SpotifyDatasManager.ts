export default class SpotifyDatasManager {
  private storeObject: Record<string, unknown> = {};

  public set<T = unknown>(key: string, value: T): void {
    if (typeof value !== "object")
      throw new TypeError("value must be type of object");

    this.storeObject[key] = Object.assign({}, value);
  }

  public get<T = unknown>(key: string): T {
    return this.storeObject[key] as T;
  }

  public map<T = unknown, K = unknown>(key: string, callback: (value: T) => K): K {
    const data = this.storeObject[key] as T;
    return (callback(data) as K);
  }
}
