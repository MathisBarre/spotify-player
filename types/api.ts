interface Ialbum {
  name: String
}

interface Iartist {
  name: String
}

enum ItrackType {
  track
}

interface ItrackDetail {
  album: Ialbum
  artists: Iartist[],
  name: String,
  preview_url: String,
  interface: ItrackType
}

export interface Itrack {
  added_at: String,
  track: ItrackDetail
}

interface Iowner {
  display_name: String
}

export interface Iplaylist {
  name: String,
  description: String,
  owner: Iowner,
  tracks: Itrack[]
}