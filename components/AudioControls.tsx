import { MouseEventHandler } from "react"
import styled from "@emotion/styled"

interface IaudioControlsProps {
  isPlaying: boolean
  onPlayPauseClick: Function
  onPrevClick: MouseEventHandler
  onNextClick: MouseEventHandler
}

export default function AudioControls({ isPlaying, onPlayPauseClick, onPrevClick, onNextClick}: IaudioControlsProps) {
  return (
    <>
      <PreviousButton onClick={onPrevClick}>Previous</PreviousButton>
      <PlayButton onClick={() => { onPlayPauseClick(!isPlaying) }}>{ isPlaying ? "Pause" : "Play" }</PlayButton>
      <NextButton onClick={onNextClick}>Next</NextButton>
      <ProgressBar value="70" max="100"></ProgressBar>
    </>
  )
}

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