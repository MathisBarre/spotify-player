import styled from "@emotion/styled"
import { Itrack, ItrackDetail } from "../types/api"

interface IaudioPlayerProps {
  tracks: Itrack[]
}

export default function AudioPlayer({ tracks } : IaudioPlayerProps) {
  const tracksDetails: ItrackDetail[] = tracks.map(track => track.track)

  function play() {
  }

  function nextTrack() {
  }

  function previousTrack() {
  }

  return (
    <AudioPlayerContainer>
      <PreviousButton onClick={previousTrack}>Previous</PreviousButton>
      <PlayButton onClick={play}>Play</PlayButton>
      <NextButton onClick={nextTrack}>Next</NextButton>
      <ProgressBar value="70" max="100"></ProgressBar>
    </AudioPlayerContainer>
  )
}

const AudioPlayerContainer = styled.section`
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

const PreviousButton = styled.button`
  margin-right: .5rem;
  width: 6rem;
  padding: 0.25rem 0;
`

const PlayButton = styled.button`
  margin-right: .5rem;
  width: 6rem;
  padding: 0.25rem 0;
`

const NextButton = styled.button`
  margin-right: 2rem;
  width: 6rem;
  padding: 0.25rem 0;
`

const ProgressBar = styled.progress`
  width: 24rem;
`