/// <reference path="../../spotify.d.ts" />
/// <reference path="../../server.d.ts" />

import ForbiddenError from "../errors/ForbiddenError.ts";

const BlockOrigin = {
  get allows(): string[] {
    const origin = ["https://krakenify-spotify-clone.vercel.app/"];

    return origin;
  },

  validate(origin: string) {
    if (!this.allows.includes(origin))
      throw new ForbiddenError("You are not allowed to use this resource");
  },
};

export default BlockOrigin;
