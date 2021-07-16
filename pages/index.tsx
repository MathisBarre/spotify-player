import { useState } from "react"
import { gql } from "@apollo/client"
import styled from "@emotion/styled"
import client from "../utils/apollo-client";
import PlaylistHeader from "../components/PlaylistHeader"
import Tracks from "../components/Tracks"
import AudioPlayer from "../components/AudioPlayer"
import { Iplaylist } from "../types/api"
import { GetStaticProps } from "next";

interface IhomeProps {
  playlist: Iplaylist
}

export default function Home({ playlist }: IhomeProps) {

  const [currentTrackId, setCurrentTrackId] = useState(null)

  return (
    <Container>
      <PlaylistHeader
        name={playlist.name}
        description={playlist.description}
        author={playlist.owner.display_name}
        nbOfTracks={playlist.tracks.length}
      />
      <Tracks tracks={playlist.tracks} currentTrackId={currentTrackId} />
      <AudioPlayer  tracks={playlist.tracks} setCurrentTrackId={setCurrentTrackId} />
    </Container>
  )
}

const Container = styled.main`
  min-height: 100vh;
  background-color: #111111;
  color: white;
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