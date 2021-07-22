import { useState } from "react"
import { gql } from "@apollo/client"
import styled from "@emotion/styled"
import client from "../utils/apollo-client";
import PlaylistHeader from "../components/PlaylistHeader"
import Tracks from "../components/Tracks"
import AudioPlayer from "../components/AudioPlayer"
import { Iplaylist, Itrack } from "../types/api"
import { GetStaticProps } from "next";

interface IhomeProps {
  playlist: Iplaylist
}

export default function Home({ playlist }: IhomeProps) {

  const [currentTrackId, setCurrentTrackId] = useState<string>("")
  const [displayedTracks, setDisplayedTracks] = useState<Itrack[]>(playlist.tracks)
  const [favoriteTracksIds, setFavoriteTracksIds] = useState<string[]>([])
  const [displayFavoriteTracks, setDisplayFavoriteTracks] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [trackIndex, setTrackIndex] = useState<number>(0)

  const filteredTracks = displayedTracks.filter((track) => favoriteTracksIds.includes(track.track.id))

  return (
    <Container>
      <PlaylistHeader
        name={playlist.name}
        description={playlist.description}
        author={playlist.owner.display_name}
        nbOfTracks={playlist.tracks.length}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Tracks
        tracks={(displayFavoriteTracks) ? filteredTracks : displayedTracks}
        currentTrackId={currentTrackId}
        favoriteTracksIds={favoriteTracksIds}
        setFavoriteTracksIds={setFavoriteTracksIds}
        setCurrentTrack={setTrackIndex}
      />
      <Controls>
        <AudioPlayer 
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          tracks={displayedTracks}
          setCurrentTrackId={setCurrentTrackId}
          trackIndex={trackIndex}
          setTrackIndex={setTrackIndex}
        />
        <FavoriteButton onClick={() => {setDisplayFavoriteTracks(!displayFavoriteTracks)}}>
          {(displayFavoriteTracks ? "Afficher toutes les pistes" : "Afficher les favoris")}
        </FavoriteButton>
      </Controls>
    </Container>
  )
}

const Container = styled.main`
  min-height: 100vh;
  background-color: #111111;
  color: white;
`

const Controls = styled.footer`
  background-color: #181818;
  height: 4rem;
  width: 100%;
  border-top: 1px solid #282828;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const FavoriteButton = styled.button`
  background-color: transparent;
  border: 2px solid white;
  color: white;
  padding: 0.25rem .5rem;
  border-radius: 100rem;
  font-weight: bold;
  position: absolute;
  right: 4rem;
  cursor: pointer;
`

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query getPlaylist {
        playlists {
          description
          name
          owner {
            display_name
          }
          tracks {
            added_at
            track {
              id
              album {
                name
              }
              artists {
                name
              }
              name
              preview_url
              type
              duration_ms
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      playlist: data.playlists[0]
    },
 };
}