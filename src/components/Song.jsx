import React from "react";
import styled from "styled-components";

const ImgDiv = styled.div`
  display: table-cell;
  vertical-align: middle;
  font-size: 18px;
  font-weight: bold;
  width: 4%;
  padding: 0px 6px 0px 0px;
`;

const Img = styled.img`
  position: relative;
  top: 0%;
  transform: translateY(-20%);
  &:hover {
    cursor: pointer;
  }
`;

const SongColumn = styled.div`
  display: table-cell;
  font-size: 18px;
  font-weight: bold;
  width: 40%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  a {
    cursor: pointer;
    color: inherit;
    text-decoration: inherit;
    &: hover {
      text-decoration: underline;
    }
  }
`;

const ArtistColumn = styled.div`
  display: table-cell;
  font-size: 18px;
  font-weight: bold;
  width: 35%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TimeColumn = styled.div`
  display: table-cell;
  font-size: 18px;
  font-weight: bold;
  width: 6%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const PlaysColumn = styled.div`
  display: table-cell;
  font-size: 18px;
  font-weight: bold;
  width: 6%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: right;
`;

const SongRow = styled.div`
  display: flex;
  width: 100%;
`;

// From https://stackoverflow.com/a/21294619
function convertMsToTime(duration_ms) {
  const minutes = Math.floor(duration_ms / 60000);
  const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function getArtistNames(songJson) {
  const artistNames = [];
  for (const artist of songJson.artists) {
    artistNames.push(artist.name);
  }
  const artistStr = artistNames.join(", ");
  return artistStr;
}

function Song(props) {
  const time = convertMsToTime(props.duration_ms);
  const artists = getArtistNames(props);

  return (
    <SongRow>
      <ImgDiv>
        <Img
          src={props.album.images[2].url}
          width={32}
          height={32}
          onClick={() => {
            window.open(props.external_urls.spotify);
          }}
        />
      </ImgDiv>
      <SongColumn title={props.name}>
        <a href={props.external_urls.spotify} target="_blank" rel="noreferrer">
          {props.name}
        </a>
      </SongColumn>
      <ArtistColumn title={artists}>{artists}</ArtistColumn>
      <TimeColumn title={time}>{time}</TimeColumn>
      {props.showPlays && (
        <PlaysColumn title={props.play}>{props.plays}</PlaysColumn>
      )}
    </SongRow>
  );
}

export default Song;
