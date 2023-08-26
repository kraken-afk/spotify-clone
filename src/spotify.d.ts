interface CoverImg {
  url: string;
  height?: number;
  width?: number;
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

interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface ArtistDetail {
  external_urls: ExternalUrls;
  followers: { href?: string; total: number };
  genres: Genres;
  href: string;
  id: string;
  images: CoverImg[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

interface Album {
  album_type: string;
  artists: Artist[];
  available_markest: Markets;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: CoverImg[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: 1;
  type: string;
  uri: string;
}

interface VideoThumbnail {
  url?: string;
}

interface ExternalIds {
  isrc: string;
}

interface Track {
  album: Album;
  artists: Artist[];
  available_markets: Markets;
  disc_number: number;
  duration_ms: number;
  explicit: false;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

interface TrackItem {
  added_at: string;
  added_by: {
    external_urls: ExternalUrls;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  primary_color?: string;
  track: Track;
  video_thumbnail: VideoThumbnail;
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

interface Playlist extends PlaylistItem {
  followers: { href?: string; total: number };
  tracks: {
    href: string;
    items: TrackItem[];
    limit: number;
    next?: string;
    offset: number;
    previous?: string;
    total: number;
  };
}

interface User {
  display_name: string;
  external_urls: ExternalUrls;
  followers: {
    href?: string;
    total: number;
  };
  href: string;
  id: string;
  images: CoverImg[];
  type: string;
  uri: string;
}

interface SavedTracks {
  href: string;
  items: Array<{
    added_at: string;
    track: Track;
  }>;
  limit: number;
  next?: string;
  offset: number;
  previous?: string;
  total: number;
}

interface Albums {
  albums: {
    href: string;
    items: Album[];
    limit: number;
    next?: string;
    offset: number;
    previous?: string;
    total: number;
  };
}

interface Copyright {
  text: string;
  type: string;
}

interface SingleTrack {
  artists: Artist[];
  available_markets: Markets;
  disc_number: 1;
  duration_ms: number;
  explicit: false;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: false;
  name: string;
  preview_url?: string;
  track_number: number;
  type: string;
  uri: string;
}

interface Single {
  album_type: string;
  artists: Artist[];
  available_markets: Markets;
  copyrights: Copyright[];
  external_ids: { udc: string };
  external_urls: ExternalUrls;
  genres: Genres;
  href: string;
  id: string;
  images: CoverImg[];
  label: string;
  name: string;
  popularity: number;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  tracks: {
    href: string;
    items: SingleTrack[];
    limit: number;
    next?: string;
    offset: number;
    previous?: string;
    total: number;
  };
  type: string;
  uri: string;
}

interface TopTrack {
  tracks: Track[];
}

interface ArtistAlbums {
  href: string;
  items: {
    album_group: string;
    album_type: string;
    artists: Artist[];
    available_markets: Markets;
    external_urls: ExternalUrls;
    spotify: string;
    href: string;
    id: string;
    images: CoverImg[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  }[];
  limit: number;
  next?: string;
  offset: number;
  previous?: string;
  total: number;
}

interface SearchResponse {
  albums?: ContentResponse<Album>;
  artists?: ContentResponse<ArtistDetail>;
  playlists?: ContentResponse<PlaylistItem>;
  error?: {
    status: number;
    message: string;
  };
}

interface Categories {
  href: string,
  icons: CoverImg[],
  id: string,
  name: string,
}
