import styled from "@emotion/styled"
import Image from "next/image"
import PlaylistHeader from "../components/PlaylistHeader"
import heartImage from "../public/images/heart.svg"

export default function Home() {
  return (
    <Container>
      <PlaylistHeader />
      <Tracks>
        <TracksTable>
          <thead>
            <tr>
              <TableLabel></TableLabel>
              <TableLabel>Title</TableLabel>
              <TableLabel>Artist</TableLabel>
              <TableLabel>Album</TableLabel>
              <TableLabel>Release date</TableLabel>
            </tr>
          </thead>
          <tbody>
            <TrackRow>
              <TableCell><Image src={heartImage} alt="like unfilled" /></TableCell>
              <TableCell>Madeleine - Original Mix</TableCell>
              <TableCell>Konstantin Siberique</TableCell>
              <TableCell>Secret Weapon</TableCell>
              <TrackReleaseDate>2019-05-08</TrackReleaseDate>
            </TrackRow>
          </tbody>
        </TracksTable>
      </Tracks>
    </Container>
  )
}

const Container = styled.main`
  min-height: 100vh;
  background-color: #111111;
  color: white;
`

const Tracks = styled.div`
  padding: 1rem;
`

const TracksTable = styled.table`
  width: 100%;
  box-sizing: content-box;
  table-layout: auto;
  overflow-wrap: break-word;
  border-collapse: collapse;
`

const TableLabel = styled.th`
  color: #A2A2A2;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: .1em;
  font-weight: 400;
  font-size: 0.875rem;
`

const TrackReleaseDate = styled.td`
  color: #A2A2A2;
  font-weight: 600;
`

const TrackRow = styled.tr`
  padding: 1rem 0;
  border-bottom: 1px #1F1F1F solid
`

const TableCell = styled.td`
  padding: .5rem 0;
`