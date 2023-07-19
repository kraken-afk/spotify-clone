interface CoverImg {
  url: string;
  height: number;
  width: number;
}

interface ExternalUrls { spotify: string }

interface CurrentProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: false;
    filter_locked: false;
  };
  external_urls: ExternalUrls;
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

interface PlaylistItem {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls
  href: string;
  id: string;
  images: Array<CoverImg>;
  name: string;
  owner: {
    display_name: string;
    external_urls: ExternalUrls
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
}

interface Playlists {
  href: string;
  items: Array<PlaylistItem>;
  limit: number;
  next?: string;
  offset: number;
  previous?: string;
  total: number;
}

interface ShowItem {
  audio_preview_url: string;
  description: string;
  duration_ms: number;
  explicit: false;
  external_urls: ExternalUrls;
  href: string;
  html_description: string;
  id: string;
  images: Array<CoverImg>;
  is_externally_hosted: boolean;
  is_playable: true;
  language: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
}

interface FeaturedPlaylist {
  message: string;
  playlists: Playlists;
}

interface Shows {
  href: string;
  items: ShowItem[];
  limit: number;
  next: string;
  offset: 0;
  previous?: string;
  total: number;
}
