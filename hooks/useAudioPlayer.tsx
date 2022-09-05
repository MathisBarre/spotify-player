import { useContext } from "react";
import { AudioRefContext } from "../context/Audio.context";

export function useAudioPlayer() {
  const audioRef = useContext(AudioRefContext);

  function loadAndPlayTrack(audioUrl: string) {
    if (!audioRef?.current) return;

    audioRef?.current?.pause();
    audioRef.current = new Audio(audioUrl);
    audioRef.current.play();
  }

  function pauseCurrentTrack() {
    if (!audioRef?.current) return;

    audioRef.current?.pause();
  }

  function playCurrentTrack() {
    if (!audioRef?.current) return;

    audioRef.current?.play();
  }

  return { loadAndPlayTrack, pauseCurrentTrack, playCurrentTrack };
}
