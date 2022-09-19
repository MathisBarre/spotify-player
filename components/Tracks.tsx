import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import emptyHeartImage from "../public/images/emptyHeart.svg";
import filledHeartImage from "../public/images/filledHeart.svg";
import { Track } from "../types/api";
import dayjs from "dayjs";
import { classNames } from "../utils/styles.utils";
import { displayArtists } from "../utils/misc.utils";

interface TracksProps {
  tracks: Track[];
  currentTrackId: string;
  favoriteTracksIds: string[];
  setFavoriteTracksIds: Dispatch<SetStateAction<string[]>>;
  setCurrentTrack: Dispatch<SetStateAction<number>>;
}

export default function Tracks({
  tracks,
  currentTrackId,
  favoriteTracksIds,
  setFavoriteTracksIds,
  setCurrentTrack,
}: TracksProps) {
  const toggleFavorite = (trackIdToUpdate: string): void => {
    if (favoriteTracksIds.includes(trackIdToUpdate)) {
      const newFavoriteTracksIds = favoriteTracksIds.filter(
        (trackId) => trackId !== trackIdToUpdate
      );
      setFavoriteTracksIds(newFavoriteTracksIds);
    } else {
      setFavoriteTracksIds([...favoriteTracksIds, trackIdToUpdate]);
    }
  };

  return (
    <div className="p-4 pb-20">
      {tracks.length > 0 ? (
        <div className="w-full box-content break-words border-collapse flex flex-col">
          <div className="hidden md:grid md:grid-cols-[auto_3fr_2fr_3fr_2fr]">
            <TableLabel>
              <div className="w-[4.6875rem]" />
            </TableLabel>
            <TableLabel>Title</TableLabel>
            <TableLabel>Artist</TableLabel>
            <TableLabel>Album</TableLabel>
            <TableLabel>Date added</TableLabel>
          </div>
          {tracks.map((trackInfos: Track, index: number) => {
            return (
              <div
                className={classNames(
                  `py-4 border-b border-b-spotifyGray-400 cursor-pointer flex md:grid md:grid-cols-[auto_3fr_2fr_3fr_2fr] rounded-md hover:bg-[#ffffff16] last:border-b-[transparent]`,
                  trackInfos.track.id === currentTrackId
                    ? "bg-[#ffffff0d]"
                    : "bg-transparent"
                )}
                onClick={() => {
                  setCurrentTrack(index);
                }}
                key={trackInfos.track.id}
              >
                <button
                  className="px-6 flex items-center"
                  onClick={() => {
                    toggleFavorite(trackInfos.track.id);
                  }}
                >
                  {favoriteTracksIds.includes(trackInfos.track.id) ? (
                    <Image
                      className="cursor-pointer h-6 w-6"
                      src={filledHeartImage}
                      alt="like filled"
                      height="24"
                      width="24"
                    />
                  ) : (
                    <Image
                      className="cursor-pointer h-6 w-6"
                      src={emptyHeartImage}
                      alt="like unfilled"
                      onClick={() => {
                        toggleFavorite(trackInfos.track.id);
                      }}
                      height="24"
                      width="24"
                    />
                  )}
                </button>

                {/* Mobile only */}
                <div className="md:hidden">
                  <h2 className="text-mg font-bold text-white">
                    {trackInfos.track.name}
                  </h2>
                  <h2 className="text-spotifyGray-100">
                    {displayArtists(trackInfos.track.artists)}
                  </h2>
                </div>
                {/* Mobile only */}

                {/* Desktop only */}
                <TableCell>{trackInfos.track.name}</TableCell>
                <TableCell>
                  {displayArtists(trackInfos.track.artists)}
                </TableCell>
                <TableCell>{trackInfos.track.album.name}</TableCell>
                <div className="color-spotifyGray-100 font-semibold hidden md:block">
                  {dayjs(trackInfos.added_at).format("YYYY-MM-DD")}
                </div>
                {/* Desktop only */}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center">Aucune piste disponible</p>
      )}
    </div>
  );
}

const TableLabel: React.FC = ({ children }) => {
  return (
    <div className="text-spotifyGray-100 text-left uppercase tracking-widest font-normal text-sm pb-3 flex">
      {children}
    </div>
  );
};

const TableCell: React.FC = ({ children }) => {
  return (
    <div className="whitespace-nowrap text-ellipsis overflow-hidden pr-8 hidden md:block">
      {children}
    </div>
  );
};
