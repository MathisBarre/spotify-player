import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { Track, TrackDetails } from "../types/api";
import Image from "next/image";
import playImage from "../public/images/play.svg";
import pauseImage from "../public/images/pause.svg";
import nextImage from "../public/images/next.svg";
import previousImage from "../public/images/previous.svg";

interface AudioPlayerProps {
  tracks: Track[];
  setCurrentTrackId: Function;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  trackIndex: number;
  setTrackIndex: Dispatch<SetStateAction<number>>;
}

export default function AudioPlayer({
  tracks,
  setCurrentTrackId,
  isPlaying,
  setIsPlaying,
  setTrackIndex,
  trackIndex,
}: AudioPlayerProps) {
  const tracksDetails: TrackDetails[] = tracks.map((track) => track.track);

  const [lastAction, setLastAction] = useState<"PREV" | "NEXT">("NEXT");

  const { preview_url, id: trackId } = tracksDetails[trackIndex];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isReady = useRef<boolean>(false);

  const toPrevTrack = () => {
    setLastAction("PREV");
    if (trackIndex - 1 < 0) setTrackIndex(tracks.length - 1);
    else setTrackIndex(trackIndex - 1);
  };

  const toNextTrack = () => {
    setLastAction("NEXT");
    if (trackIndex < tracks.length - 1) setTrackIndex(trackIndex + 1);
    else setTrackIndex(0);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef?.current?.play();
    } else {
      audioRef?.current?.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  useEffect(() => {
    if (preview_url === null) {
      if (lastAction === "NEXT") toNextTrack();
      else toPrevTrack();
    } else {
      setCurrentTrackId(trackId);

      audioRef?.current?.pause();

      audioRef.current = new Audio(preview_url);

      if (isReady.current) {
        setIsPlaying(true);
        audioRef.current.play();
      } else {
        isReady.current = true;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex]);

  useEffect(() => {
    return () => {
      audioRef?.current?.pause();
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <button
        className="w-8 mx-2 py-1 flex justify-center bg-transparent border-none cursor-pointer"
        onClick={toPrevTrack}
      >
        <Image alt="previous" src={previousImage} />
      </button>
      <button
        className="w-12 h-12 rounded-full border-none px-0 py-1 flex justify-center items-center bg-transparent cursor-pointer"
        onClick={() => {
          setIsPlaying((currentIsPlayingValue) => !currentIsPlayingValue);
        }}
      >
        {isPlaying ? (
          <Image
            className="h-12 w-12"
            src={pauseImage}
            height="48"
            width="48"
            alt=""
          />
        ) : (
          <Image
            className="h-12 w-12"
            src={playImage}
            height="48"
            width="48"
            alt=""
          />
        )}
      </button>
      <button
        className="w-8 mx-2 py-1 flex justify-center bg-transparent border-none cursor-pointer"
        onClick={toNextTrack}
      >
        <Image alt="next" src={nextImage} />
      </button>
    </div>
  );
}
