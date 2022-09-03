import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import playlistImage from "../public/images/playlist.png";

interface IplaylistHeaderProps {
  name: string;
  nbOfTracks: number;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

export default function PlaylistHeader({
  name,
  nbOfTracks,
  isPlaying,
  setIsPlaying,
}: IplaylistHeaderProps) {
  function getAuthorProfileUrl(authorName: string): string {
    return `#/user/${authorName.replace(" ", "-").toLocaleLowerCase()}`;
  }

  function playOrPausePlaylist() {
    setIsPlaying(!isPlaying);
  }

  return (
    <PlaylistHeaderContainer>
      <Image alt="" src={playlistImage} />
      <PlaylistDetails>
        <h1>
          <PlaylistTag>PLAYLIST</PlaylistTag>
          <br />
          <PlaylistTitle>{name}</PlaylistTitle>
        </h1>
        <PlaylistActions>
          <PlaylistPlayButton onClick={playOrPausePlaylist}>
            {isPlaying ? "PAUSE" : "PLAY"}
          </PlaylistPlayButton>
        </PlaylistActions>
      </PlaylistDetails>
    </PlaylistHeaderContainer>
  );
}

const PlaylistHeaderContainer = styled.header`
  width: 100%;
  background: linear-gradient(to bottom, #373737, #111111);
  padding: 1rem;
  display: flex;
`;

const PlaylistDetails = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  padding: 0rem 2rem;
`;

const PlaylistTag = styled.span`
  letter-spacing: 0.1em;
  font-weight: 600;
  color: #a2a2a2;
`;

const PlaylistTitle = styled.span`
  font-size: 4rem;
  font-weight: 900;
  line-height: 1;
`;

const PlaylistDescription = styled.p`
  color: #a2a2a2;
  margin: 0.75rem 0;
  font-weight: 600;
`;

const PlaylistInformations = styled.p`
  color: #a2a2a2;
  font-weight: 600;
`;

const PlaylistAuthor = styled.a`
  color: white;
`;

const PlaylistActions = styled.div`
  margin-top: 1.5rem;
  display: flex;
`;

const PlaylistPlayButton = styled.button`
  background-color: #1aba53;
  border: none;
  color: white;
  padding: 0.5rem 2.5rem;
  border-radius: 100rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  cursor: pointer;
`;

const PlaylistLikeButton = styled.button`
  border: 2px solid #cbcbcb;
  background: transparent;
  border-radius: 100rem;
  height: 2rem;
  width: 2rem;
  margin-left: 0.5rem;
  cursor: pointer;
`;

const PlaylistLikeIcon = styled.img`
  height: 1.5rem;
  width: 1.5rem;
`;
