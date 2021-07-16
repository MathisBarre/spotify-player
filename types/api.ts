interface Ialbum {
  name: string
}

interface Iartist {
  name: string
}

enum ItrackType {
  track
}

export interface ItrackDetail {
  id: number
  album: Ialbum
  artists: Iartist[]
  name: string
  preview_url: string
  interface: ItrackType
}

export interface Itrack {
  added_at: string
  track: ItrackDetail
}

interface Iowner {
  display_name: string
}

export interface Iplaylist {
  name: string
  description: string
  owner: Iowner
  tracks: Itrack[]
}