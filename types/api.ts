export interface Image {
  height?: any;
  width?: any;
  url: string;
}

export interface Album {
  name: string;
}

export interface Artist {
  name: string;
}

export interface TrackDetails {
  id: string;
  name: string;
  album: Album;
  artists: Artist[];
  preview_url: string;
  duration_ms: number;
}

export interface Track {
  added_at: Date;
  track: TrackDetails;
}

export interface Playlist {
  name: string;
  images: Image[];
  tracks: Track[];
}

export interface ApiResponse {
  playlist: Playlist;
}
