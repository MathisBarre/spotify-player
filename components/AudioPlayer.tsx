import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import styled from "@emotion/styled";
import { Itrack, ItrackDetail } from "../types/api";
import Image from "next/image";
import playImage from "../public/images/play.svg";
import pauseImage from "../public/images/pause.svg";
import nextImage from "../public/images/next.svg";
import previousImage from "../public/images/previous.svg";

interface IaudioPlayerProps {
  tracks: Itrack[];
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
}: IaudioPlayerProps) {
  const tracksDetails: ItrackDetail[] = tracks.map((track) => track.track);

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
    <>
      <NextPrevButton onClick={toPrevTrack}>
        <Image alt="previous" src={previousImage} />
      </NextPrevButton>
      <PlayButton
        onClick={() => {
          setIsPlaying(!isPlaying);
        }}
      >
        {isPlaying ? (
          <PlayPauseImage
            as={Image}
            src={pauseImage}
            height="48"
            width="48"
            alt=""
          />
        ) : (
          <PlayPauseImage
            as={Image}
            src={playImage}
            height="48"
            width="48"
            alt=""
          />
        )}
      </PlayButton>
      <NextPrevButton onClick={toNextTrack}>
        <Image alt="next" src={nextImage} />
      </NextPrevButton>
    </>
  );
}

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
`;

const PlayPauseImage = styled.img`
  height: 3rem;
  width: 3rem;
`;

const NextPrevButton = styled.button`
  width: 2rem;
  margin: 0rem 0.5rem;
  padding: 0.25rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
