import { useState, useEffect, useRef } from "react"
import styled from "@emotion/styled"
import Image from "next/image"
import heartImage from "../public/images/heart.svg"
import { Itrack } from "../types/api"
import dayjs from "dayjs"

interface ItracksProps {
  tracks: Itrack[]
  currentTrackId: string
}

export default function Tracks({ tracks, currentTrackId }: ItracksProps) { 
  const [favoriteTracksIds, setFavoriteTracksIds] = useState<string[]>([])
  const componentDidMount = useRef<boolean>(false)

  useEffect(() => {
    if (componentDidMount.current) {
      localStorage.setItem("favoriteTracksId", JSON.stringify(favoriteTracksIds))
    } else {
      setFavoriteTracksIds(JSON.parse(localStorage.getItem("favoriteTracksId") || "[]"))
      componentDidMount.current = true
    }
  }, [favoriteTracksIds])

  function addOrRemoveAFavorite(trackIdToUpdate: string): void {
    if ( favoriteTracksIds.includes(trackIdToUpdate) ) {
      const newFavoriteTracksIds = favoriteTracksIds.filter((trackId) => trackId !== trackIdToUpdate)
      setFavoriteTracksIds(newFavoriteTracksIds)
    } else {
      setFavoriteTracksIds([...favoriteTracksIds, trackIdToUpdate])
    }
  }

  return (
    <TracksContainer>
      <TracksTable>
        <thead>
          <tr>
            <TableLabel></TableLabel>
            <TableLabel>Title</TableLabel>
            <TableLabel>Artist</TableLabel>
            <TableLabel>Album</TableLabel>
            <TableLabel>Date added</TableLabel>
          </tr>
        </thead>
        <tbody>
          { tracks.map((trackInfos: Itrack, index: number) => {
            return (
              <TrackRow playedTrack={trackInfos.track.id === currentTrackId} key={trackInfos.track.id} >
                <LikeTableCell><TrackLikeButton as={Image} src={heartImage} alt="like unfilled" onClick={() => {addOrRemoveAFavorite(trackInfos.track.id)}} /></LikeTableCell>
                <TableCell>{trackInfos.track.name}</TableCell>
                <TableCell>{trackInfos.track.artists[0].name}</TableCell>
                <TableCell>{trackInfos.track.album.name}</TableCell>
                <TrackReleaseDate>{dayjs(trackInfos.added_at).format("YYYY-MM-DD")}</TrackReleaseDate>
              </TrackRow>
            )
          }) }
        </tbody>
      </TracksTable>
    </TracksContainer>
  )
}

const TracksContainer = styled.div`
  padding: 1rem;
  padding-bottom: 5rem;
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
  padding-bottom: .75rem;
`

const TrackReleaseDate = styled.td`
  color: #A2A2A2;
  font-weight: 600;
`

const TrackRow = styled.tr`
  padding: 1rem 0;
  border-bottom: 1px #1F1F1F solid;
  background-color: ${props => props.playedTrack ? "#ffffff0d" : "transparent"};
  &:last-child {
    border-bottom: transparent
  }
`

const TableCell = styled.td`
  padding: .5rem 0;
`

const LikeTableCell = styled.td`
  padding: .5rem .5rem .5rem 1.5rem;
  display: flex;
  align-items: center;
`

const TrackLikeButton = styled.img`
  cursor: pointer;
`