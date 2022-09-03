import { useState } from "react";
import { gql } from "@apollo/client";
import client from "../utils/apollo-client";
import PlaylistHeader from "../components/PlaylistHeader";
import Tracks from "../components/Tracks";
import AudioPlayer from "../components/AudioPlayer";
import { Iplaylist, Itrack } from "../types/api";
import { GetServerSideProps } from "next";

interface IhomeProps {
  playlist: Iplaylist;
}

export default function Home({ playlist }: IhomeProps) {
  const [currentTrackId, setCurrentTrackId] = useState<string>("");
  const [displayedTracks] = useState<Itrack[]>(playlist.tracks);
  const [favoriteTracksIds, setFavoriteTracksIds] = useState<string[]>([]);
  const [displayFavoriteTracks, setDisplayFavoriteTracks] =
    useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [trackIndex, setTrackIndex] = useState<number>(0);

  const filteredTracks = displayedTracks.filter((track) =>
    favoriteTracksIds.includes(track.track.id)
  );

  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <PlaylistHeader
        name={playlist.name}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Tracks
        tracks={displayFavoriteTracks ? filteredTracks : displayedTracks}
        currentTrackId={currentTrackId}
        favoriteTracksIds={favoriteTracksIds}
        setFavoriteTracksIds={setFavoriteTracksIds}
        setCurrentTrack={setTrackIndex}
      />
      <footer className="bg-[#181818] h-16 w-full border-t border-[#282828] fixed left-0 bottom-0 flex items-center justify-center">
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
            setDisplayFavoriteTracks(!displayFavoriteTracks);
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
  const { data } = await client.query({
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

  return {
    props: {
      playlist: data.playlist,
    },
  };
};
