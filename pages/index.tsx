import { useQuery, gql } from "@apollo/client"
import styled from "@emotion/styled"

import PlaylistHeader from "../components/PlaylistHeader"
import Tracks from "../components/Tracks"

import { Iplaylist } from "../types/api"

interface Idata {
  playlists: Iplaylist[]
}

export default function Home() {
  const { loading, error, data } = useQuery<Idata>(gql`
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
            album {
              name
            }
            artists {
              name
            }
            name
            preview_url
            type
          }
        }
      }
    }
  `)

  return (
    <Container>
      <PlaylistHeader />
      { loading ? <Loading /> : (error || data === undefined) ? <DisplayError /> : <Tracks playlist={data.playlists[0]} />}
    </Container>
  )
}

function Loading() {
  return (
    <p>Loading...</p>
  )
}

function DisplayError() {
  return (
    <p>Error during data fetching...</p>
  )
}

const Container = styled.main`
  min-height: 100vh;
  background-color: #111111;
  color: white;
`