import { Artist } from "./Artist";

export interface Track {
  artists: Artist[];
  explicit: boolean;
  duration_ms: number;
  album: {
    images: {
      url: string;
      height: number;
      width: number;
    }[];
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  preview_url: string;
  type: "track";
  uri: string;
}
