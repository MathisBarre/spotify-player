import { useEffect } from "react"
import { useQuery, gql } from "@apollo/client"
import styled from "@emotion/styled"

import PlaylistHeader from "../components/PlaylistHeader"
import Tracks from "../components/Tracks"

export default function Home() {
  const { loading, error, data } = useQuery(gql`
    query getPlaylist {
      launchesPast(limit: 10) {
        mission_name
      }
    }
  `)

  useEffect(() => {
    console.log(`loading: ${loading}`)
    console.log(`error:  ${error}`)
    console.log(data)
  }, [loading, error, data])

  return (
    <Container>
      <PlaylistHeader />
      <Tracks />
    </Container>
  )
}

const Container = styled.main`
  min-height: 100vh;
  background-color: #111111;
  color: white;
`