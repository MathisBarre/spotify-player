import React, { useState, useEffect, useRef } from "react"
import styled from "@emotion/styled"
import { Itrack, ItrackDetail } from "../types/api"
import AudioControls from "../components/AudioControls"

interface IaudioPlayerProps {
  tracks: Itrack[]
}

export default function AudioPlayer ({ tracks }: IaudioPlayerProps) {
  const tracksDetails: ItrackDetail[] = tracks.map(track => track.track)

  const [trackIndex, setTrackIndex] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const { preview_url } = tracksDetails[trackIndex]

  const audioRef = useRef<any>(null) //! need better typing
  const intervalRef = useRef<any>() //! need better typing
  const isReady = useRef<boolean>(false)

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) setTrackIndex(tracks.length - 1)
    else setTrackIndex(trackIndex - 1)
  }

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) setTrackIndex(trackIndex + 1)
    else setTrackIndex(0)
  }

  useEffect(() => {
    if (isPlaying) {
      audioRef?.current?.play()
    } else {
      audioRef?.current?.pause()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying])

  useEffect(() => {
    if (preview_url === null) {
      toNextTrack()
    } else {
      audioRef?.current?.pause()

      audioRef.current = new Audio(preview_url)
  
      if (isReady.current) {
        setIsPlaying(true)
      } else {
        isReady.current = true
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex])

  useEffect(() => {
    return () => {
      audioRef?.current?.pause()
      clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <AudioPlayerContainer>
      <AudioControls
        isPlaying={isPlaying}
        onPrevClick={toPrevTrack}
        onNextClick={toNextTrack}
        onPlayPauseClick={setIsPlaying}
      />
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