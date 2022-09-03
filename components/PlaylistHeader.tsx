import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import playlistImage from "../public/images/playlist.png";

interface IplaylistHeaderProps {
  name: string;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

export default function PlaylistHeader({
  name,
  isPlaying,
  setIsPlaying,
}: IplaylistHeaderProps) {
  function playOrPausePlaylist() {
    setIsPlaying(!isPlaying);
  }

  return (
    <header className="w-full bg-gradient-to-b from-[#373737] to-[#111111] p-4 flex">
      <Image alt="" src={playlistImage} />
      <div className="flex justify-center flex-col px-8">
        <h1>
          <span className="tracking-widest text-[#a2a2a2]">PLAYLIST</span>
          <br />
          <span className="text-6xl font-black leading-none">{name}</span>
        </h1>
        <div className="mt-6 flex">
          <button
            className="bg-[#1aba53] border-none py-2 px-10 rounded-full font-semibold tracking-widest cursor-pointer"
            onClick={playOrPausePlaylist}
          >
            {isPlaying ? "PAUSE" : "PLAY"}
          </button>
        </div>
      </div>
    </header>
  );
}
