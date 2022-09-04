import { useRef } from "react";
import { TrackDetails } from "../types/api";

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function loadAndPlayTrack(trackDetails: TrackDetails) {
    audioRef?.current?.pause();
    audioRef.current = new Audio(trackDetails.preview_url);
    audioRef.current.play();
  }

  function pauseCurrentTrack() {
    audioRef.current?.pause();
  }

  function playCurrentTrack() {
    audioRef.current?.play();
  }

  return { playTrack: loadAndPlayTrack, pauseCurrentTrack, playCurrentTrack };
}
