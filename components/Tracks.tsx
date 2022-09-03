import { useEffect, useRef, Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import emptyHeartImage from "../public/images/emptyHeart.svg";
import filledHeartImage from "../public/images/filledHeart.svg";
import { Itrack } from "../types/api";
import dayjs from "dayjs";

interface ItracksProps {
  tracks: Itrack[];
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
}: ItracksProps) {
  const componentDidMount = useRef<boolean>(false);

  useEffect(() => {
    if (componentDidMount.current) {
      localStorage.setItem(
        "favoriteTracksId",
        JSON.stringify(favoriteTracksIds)
      );
    } else {
      setFavoriteTracksIds(
        JSON.parse(localStorage.getItem("favoriteTracksId") || "[]")
      );
      componentDidMount.current = true;
    }
  }, [favoriteTracksIds, setFavoriteTracksIds]);

  function addOrRemoveAFavorite(trackIdToUpdate: string): void {
    if (favoriteTracksIds.includes(trackIdToUpdate)) {
      const newFavoriteTracksIds = favoriteTracksIds.filter(
        (trackId) => trackId !== trackIdToUpdate
      );
      setFavoriteTracksIds(newFavoriteTracksIds);
    } else {
      setFavoriteTracksIds([...favoriteTracksIds, trackIdToUpdate]);
    }
  }

  return (
    <TracksContainer>
      {tracks.length > 0 ? (
        <TracksTable>
          <TrackRowHead>
            <TableLabel>
              <HeadSpacer />
            </TableLabel>
            <TableLabel>Title</TableLabel>
            <TableLabel>Artist</TableLabel>
            <TableLabel>Album</TableLabel>
            <TableLabel>Date added</TableLabel>
          </TrackRowHead>
          {tracks.map((trackInfos: Itrack, index: number) => {
            return (
              <TrackRow
                onClick={() => {
                  setCurrentTrack(index);
                }}
                playedTrack={trackInfos.track.id === currentTrackId}
                key={trackInfos.track.id}
              >
                <LikeTableCell
                  onClick={(e) => {
                    console.log(e);
                    e.stopPropagation();
                    addOrRemoveAFavorite(trackInfos.track.id);
                  }}
                >
                  {favoriteTracksIds.includes(trackInfos.track.id) ? (
                    <TrackLikeButton
                      as={Image}
                      src={filledHeartImage}
                      alt="like filled"
                      height="24"
                      width="24"
                    />
                  ) : (
                    <TrackLikeButton
                      as={Image}
                      src={emptyHeartImage}
                      alt="like unfilled"
                      onClick={() => {
                        addOrRemoveAFavorite(trackInfos.track.id);
                      }}
                      height="24"
                      width="24"
                    />
                  )}
                </LikeTableCell>
                <TableCell>{trackInfos.track.name}</TableCell>
                <TableCell>{trackInfos.track.artists[0].name}</TableCell>
                <TableCell>{trackInfos.track.album.name}</TableCell>
                <TrackReleaseDate>
                  {dayjs(trackInfos.added_at).format("YYYY-MM-DD")}
                </TrackReleaseDate>
              </TrackRow>
            );
          })}
        </TracksTable>
      ) : (
        <NoTrackText>Aucune piste disponible</NoTrackText>
      )}
    </TracksContainer>
  );
}

const TracksContainer = styled.div`
  padding: 1rem;
  padding-bottom: 5rem;
`;

const TracksTable = styled.div`
  width: 100%;
  box-sizing: content-box;
  table-layout: auto;
  overflow-wrap: break-word;
  border-collapse: collapse;
  display: flex;
  flex-direction: column;
`;

const TrackRowHead = styled.div`
  display: grid;
  grid-template-columns: auto 3fr 2fr 3fr 2fr;
`;

const HeadSpacer = styled.div`
  width: 4.6875rem;
`;

const TableLabel = styled.div`
  color: #a2a2a2;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 400;
  font-size: 0.875rem;
  padding-bottom: 0.75rem;
  display: flex;
`;

const TrackReleaseDate = styled.div`
  color: #a2a2a2;
  font-weight: 600;
`;

interface ItrackRowProps {
  playedTrack: boolean;
}

const TrackRow = styled("div")<ItrackRowProps>`
  padding: 1rem 0;
  border-bottom: 1px #1f1f1f solid;
  background-color: ${(props) =>
    props.playedTrack ? "#ffffff0d" : "transparent"};
  cursor: pointer;
  display: grid;
  grid-template-columns: auto 3fr 2fr 3fr 2fr;
  border-radius: 0.25rem;
  &:last-child {
    border-bottom: transparent;
  }
  &:hover {
    background-color: #ffffff16;
  }
`;

const TableCell = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-right: 2rem;
`;

const LikeTableCell = styled.div`
  padding: 0rem 1.5rem;
  display: flex;
  align-items: center;
`;

const TrackLikeButton = styled.img`
  cursor: pointer;
  height: 1.5rem;
  width: 1.5rem;
`;

const NoTrackText = styled.p`
  text-align: center;
`;
