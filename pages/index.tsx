import { useEffect } from "react"
import { useQuery, gql } from "@apollo/client"
import styled from "@emotion/styled"

import PlaylistHeader from "../components/PlaylistHeader"
import Tracks from "../components/Tracks"

export default function Home() {
  const { loading, error, data } = useQuery(gql`
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
      { loading ? <Loading /> : error ? <DisplayError /> : <Tracks playlist={data.playlists[0]} />}
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