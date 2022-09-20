import { Artist } from "../types/api";

export function displayArtists(artists: Artist[]) {
  return artists.map((artist) => `${artist.name}`).join(", ");
}
