import Image from "next/image"
import styled from "@emotion/styled"
import playlistImage from "../public/images/playlist.png"
import heartImage from "../public/images/heart.svg"

export default function PlaylistHeader() {
  return (
    <PlaylistHeaderContainer>
      <Image alt="" src={playlistImage} />
      <PlaylistDetails>
        <h1>
          <PlaylistTag>PLAYLIST</PlaylistTag><br />
          <PlaylistTitle>Rituel Days 2019</PlaylistTitle>
        </h1>
        <PlaylistDescription>La playlist non officielle du festival</PlaylistDescription>
        <PlaylistInformations>Created by <PlaylistAuthor href="#/user/sylvain-cr">Sylvain Cr</PlaylistAuthor> • 50 songs, 5 hr 38 min</PlaylistInformations>
        <PlaylistActions>
          <PlaylistPlayButton>PLAY</PlaylistPlayButton>
          <PlaylistLikeButton>
            <PlaylistLikeIcon as={Image} src={heartImage} />
          </PlaylistLikeButton>
        </PlaylistActions>
      </PlaylistDetails>
    </PlaylistHeaderContainer>
  )
}


const PlaylistHeaderContainer = styled.header`
  width: 100%;
  background: linear-gradient(to bottom, #373737, #111111);
  padding: 1rem;
  display: flex;
`

const PlaylistDetails = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  padding: 0rem 2rem;
`

const PlaylistTag = styled.span`
  letter-spacing: .1em;
  font-weight: 600;
  color: #A2A2A2;
`

const PlaylistTitle = styled.span`
  font-size: 4rem;
  font-weight: 900;
  line-height: 1;
`

const PlaylistDescription = styled.p`
  color: #A2A2A2;
  margin: .75rem 0;
  font-weight: 600;
`

const PlaylistInformations = styled.p`
  color: #A2A2A2;
  font-weight: 600;

`

const PlaylistAuthor = styled.a`
  color: white;
`

const PlaylistActions = styled.div`
  margin-top: 1.5rem;
  display: flex;
`

const PlaylistPlayButton = styled.button`
  background-color: #1aba53;
  border: none;
  color: white;
  padding: .5rem 2.5rem;
  border-radius: 100rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  cursor: pointer;
`

const PlaylistLikeButton = styled.button`
  border: 2px solid #CBCBCB;
  background: transparent;
  border-radius: 100rem;
  height: 2rem;
  width: 2rem;
  margin-left: .5rem;
  cursor: pointer;
`

const PlaylistLikeIcon = styled.img`
  height: 1.5rem;
  width: 1.5rem;
`