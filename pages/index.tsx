import { useState } from "react";
import { gql } from "@apollo/client";
import client from "../utils/apollo-client";
import PlaylistHeader from "../components/PlaylistHeader";
import Tracks from "../components/Tracks";
import AudioPlayer from "../components/AudioPlayer";
import { ApiResponse, Playlist, Track } from "../types/api";
import { GetServerSideProps } from "next";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface HomeProps {
  playlist: Playlist;
}

export default function Home({ playlist }: HomeProps) {
  const [currentTrackId, setCurrentTrackId] = useState<string>("");
  const [displayedTracks] = useState<Track[]>(playlist.tracks);
  const [favoriteTracksIds, setFavoriteTracksIds] = useLocalStorage<string[]>(
    "favoriteTracksId",
    []
  );

  const [displayFavoriteTracks, setDisplayFavoriteTracks] =
    useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [trackIndex, setTrackIndex] = useState<number>(0);

  const filteredTracks = displayedTracks.filter((track) =>
    favoriteTracksIds.includes(track.track.id)
  );

  return (
    <main className="min-h-screen">
      <PlaylistHeader
        name={playlist.name}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        playlistImageUrl={playlist.images[0].url}
      />
      <Tracks
        tracks={displayFavoriteTracks ? filteredTracks : displayedTracks}
        currentTrackId={currentTrackId}
        favoriteTracksIds={favoriteTracksIds}
        setFavoriteTracksIds={setFavoriteTracksIds}
        setCurrentTrack={setTrackIndex}
      />
      <footer className="bg-spotifyGray-500 h-16 w-full border-t border-spotifyGray-300 fixed left-0 bottom-0 flex items-center justify-center">
        <AudioPlayer
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          tracks={displayedTracks}
          setCurrentTrackId={setCurrentTrackId}
          trackIndex={trackIndex}
          setTrackIndex={setTrackIndex}
        />
        <button
          className="bg-transparent border-2 border-white text-white px-2 py-1 rounded-full absolute right-16 cursor-pointer text-xs font-bold"
          onClick={() => {
            setDisplayFavoriteTracks(
              (currentDisplayFavoriteTracksValue) =>
                !currentDisplayFavoriteTracksValue
            );
          }}
        >
          {displayFavoriteTracks
            ? "Afficher toutes les pistes"
            : "Afficher les favoris"}
        </button>
      </footer>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query<ApiResponse>({
    query: gql`
      query getPlaylist {
        playlist {
          name
          images {
            height
            width
            url
          }
          tracks {
            added_at
            track {
              id
              name
              album {
                name
              }
              artists {
                name
              }
              preview_url
              duration_ms
            }
          }
        }
      }
    `,
  });

  const sanitizedTracks = data.playlist.tracks.filter(
    (track) => track.track.preview_url !== null
  );

  return {
    props: {
      playlist: {
        ...data.playlist,
        tracks: sanitizedTracks,
      },
    },
  };
};
