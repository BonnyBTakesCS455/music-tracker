import React, { useState } from "react";
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
  top: 50%;
  transform: translateY(-20%);
`;

const SongColumn = styled.div`
  display: table-cell;
  font-size: 18px;
  font-weight: bold;
  width: 40%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArtistColumn = styled.div`
  display: table-cell;
  font-size: 18px;
  font-weight: bold;
  width: 35%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TimeColumn = styled.div`
  display: table-cell;
  font-size: 18px;
  font-weight: bold;
  width: 6%;
`;

const PlaysColumn = styled.div`
  display: table-cell;
  font-size: 18px;
  font-weight: bold;
  width: 6%;
`;

const SongRow = styled.div`
  display: inline-block;
  width: 100%;
`;

const SongRow1 = styled.div`
  display: inline-block;
  width: 100%;
  color: grey;
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

function getPlays() {
  return Math.floor(Math.random() * 100);
}

function Song(props) {
  // const [pic, setPic] = useState(props.pic);

  const time = convertMsToTime(props.duration_ms);

  if (props.header) {
    return (
        <SongRow1>
        <ImgDiv>
          <Img src={''} width={32} height={32} />
        </ImgDiv>
        <SongColumn>Song</SongColumn>
        <ArtistColumn>Album</ArtistColumn>
        <TimeColumn>Time</TimeColumn>
        <PlaysColumn>Plays</PlaysColumn>
      </SongRow1>
    );
  }

  return (
    <SongRow>
      <ImgDiv>
        <Img src={props.album.images[2].url} width={32} height={32} />
      </ImgDiv>
      <SongColumn>{props.name}</SongColumn>
      <ArtistColumn>{getArtistNames(props)}</ArtistColumn>
      <TimeColumn>{time}</TimeColumn>
      <PlaysColumn>{getPlays()}</PlaysColumn>
    </SongRow>
  );
}

export default Song;
