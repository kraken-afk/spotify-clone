interface Credential {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface CurrentProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
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
  images: [
    {
      url: URL | string;
      height: number;
      width: number;
    },
  ];
  product: string;
  type: string;
  uri: string;
}
