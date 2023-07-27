interface CoverImg {
  url: string;
  height: number;
  width: number;
}

interface ExternalUrls {
  spotify: string;
}

interface ContentResponse<T = unknown> {
  href: string;
  items: T[];
  limit: number;
  offset: number;
  previous?: string;
  total: number;
}

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
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Array<CoverImg>;
  name: string;
  owner: {
    display_name: string;
    external_urls: ExternalUrls;
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

type Playlists = ContentResponse<PlaylistItem>;

type Shows = ContentResponse<ShowsItem>;

type Episodes = ContentResponse<EpisodesItem>;

interface FeaturedPlaylist {
  message: string;
  playlists: Playlists;
}

interface Genres {
  genres: Array<string[]>;
}

interface Markets {
  markets: Array<string[]>;
}

interface ShowsItem {
  added_at: string;
  show: {
    available_markets: Markets;
    copyrights: string;
    description: string;
    explicit: false;
    external_urls: ExternalUrls;
    href: string;
    html_description: string;
    id: string;
    images: CoverImg[];
    is_externally_hosted: false;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    total_episodes: number;
    type: string;
    uri: string;
  };
}

interface EpisodesItem {
  added_at: string;
  episode: {
    audio_preview_url: string;
    duration_ms: number;
    description: string;
    explicit: false;
    external_urls: ExternalUrls;
    href: string;
    html_description: string;
    id: string;
    images: CoverImg[];
    is_externally_hosted: false;
    is_playable: boolean;
    language: string;
    languages: string[];
    media_type: string;
    release_date: string;
    realease_date_precision: string;
    show: ShowsItem;
    name: string;
    publisher: string;
    media_type: string;
    total_episodes: number;
    type: string;
    uri: string;
  };
}
