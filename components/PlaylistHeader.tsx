import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
interface PlaylistHeaderProps {
  name: string;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  playlistImageUrl: string;
}

export default function PlaylistHeader({
  name,
  isPlaying,
  setIsPlaying,
  playlistImageUrl,
}: PlaylistHeaderProps) {
  function playOrPausePlaylist() {
    setIsPlaying((currentIsPlayingValue) => !currentIsPlayingValue);
  }

  return (
    <header className="w-full bg-gradient-to-b from-spotifyGray-200 to-spotifyGray-600 p-4 flex">
      {/** no alt given by the api. Since the image do not contain crucial information(s), we can let an empty value **/}
      <div className="relative w-24 md:w-48 md:h-48 h-24 min-w-[6rem] min-h-[6rem] aspect-square">
        <Image alt="" src={playlistImageUrl} layout="fill" />
      </div>
      <div className="flex justify-center flex-col pl-4 flex-1 overflow-hidden">
        <h1>
          <span className="tracking-widest text-spotifyGray-100 text-sm block">
            PLAYLIST
          </span>
          <span className="text-2xl md:text-6xl font-black leading-none whitespace-nowrap text-ellipsis overflow-hidden block">
            {name}
          </span>
        </h1>
        <div className="mt-2  flex">
          <button
            className="bg-spotifyPrimary border-none py-2 px-10 rounded-full font-semibold tracking-widest cursor-pointer text-sm"
            onClick={playOrPausePlaylist}
          >
            {isPlaying ? "PAUSE" : "PLAY"}
          </button>
        </div>
      </div>
    </header>
  );
}
