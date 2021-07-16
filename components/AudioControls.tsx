import { MouseEventHandler } from "react"
import styled from "@emotion/styled"
import Image from "next/image"
import playImage from "../public/images/play.svg"
import pauseImage from "../public/images/pause.svg"
import nextImage from "../public/images/next.svg"
import previousImage from "../public/images/previous.svg"

interface IaudioControlsProps {
  isPlaying: boolean
  onPlayPauseClick: Function
  onPrevClick: MouseEventHandler
  onNextClick: MouseEventHandler
}

export default function AudioControls({ isPlaying, onPlayPauseClick, onPrevClick, onNextClick}: IaudioControlsProps) {
  return (
    <>
      <NextPrevButton onClick={onPrevClick}>
        <Image alt="previous" src={previousImage} />
      </NextPrevButton>
      <PlayButton onClick={() => { onPlayPauseClick(!isPlaying) }}>
      {
        isPlaying 
        ? <PlayPauseImage as={Image} src={pauseImage} height="48" width="48" alt="" />
        : <PlayPauseImage as={Image} src={playImage} height="48" width="48" alt="" />
      }
      </PlayButton>
      <NextPrevButton onClick={onNextClick}>
        <Image alt="next" src={nextImage} />
      </NextPrevButton>
      {/* <ProgressBar value="70" max="100"></ProgressBar> */}
    </>
  )
}

const PreviousButton = styled.button`
  margin-right: .5rem;
  width: 6rem;
  padding: 0.25rem 0;
`

const PlayButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 100rem;
  border: none;
  padding: 0.25rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
`

const PlayPauseImage = styled.img`
  height: 3rem;
  width: 3rem;
`

const NextPrevButton = styled.button`
  width: 2rem;
  margin: 0rem .5rem;
  padding: 0.25rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`