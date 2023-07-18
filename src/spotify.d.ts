interface CoverImg {
  url: string;
  height: number;
  width: number;
}

interface CurrentProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: false;
    filter_locked: false;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: Array<CoverImg>;
  product: string;
  type: string;
  uri: string;
}

interface CurrentProfilePlaylist {
  href: string;
  items: Array<{
    collaborative: boolean;
    description: string;
    external_urls: { spotify: string };
    href: string;
    id: string;
    images: Array<CoverImg>;
    name: string;
    owner: {
      display_name: string;
      external_urls: { spotify: string };
      href: string;
      id: string;
      type: string;
      uri: string;
    };
    primary_color?: string;
    public: boolean;
    snapshot_id: string;
    tracks: {
      href: string;
      total: number;
    };
    type: string;
    uri: string;
  }>;
  limit: number;
  next?: string;
  offset: number;
  previous?: string;
  total: number;
}
