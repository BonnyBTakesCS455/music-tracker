import React, { useState } from "react";
import styled from "styled-components";

const ImgDiv = styled.div`
  display: table-cell;
  vertical-align: middle;
  font-size: 18px;
  font-weight: bolder;
  width: 4%;
  padding: 0;
`;

const SongColumn = styled.div`
  display: table-cell;
  font-size: 18px;
  font-weight: bolder;
  width: 40%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 4px;
`;

const ArtistColumn = styled.div`
  display: table-cell;
  font-size: 18px;
  font-weight: bolder;
  width: 35%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 3px;
`;

const TimeColumn = styled.div`
  display: table-cell;
  font-size: 18px;
  font-weight: bolder;
  width: 6%;
  padding-left: 1px;
`;

const PlaysColumn = styled.div`
  display: table-cell;
  font-size: 18px;
  font-weight: bolder;
  width: 6%;
  margin-left: 10px;
`;

const SongRow = styled.div`
  display: table;
  width: 100%;
  color: grey;
  margin: 4px 4px 12px 0px;
  overflow: visible;
  line-height: normal;
  text-align: left;
`;

function SongHeader(props) {
    return (
        <SongRow>
            <ImgDiv></ImgDiv>
            <SongColumn>Song</SongColumn>
            <ArtistColumn>Artist</ArtistColumn>
            <TimeColumn>Time</TimeColumn>
            <PlaysColumn>Plays</PlaysColumn>
        </SongRow>
    );
}

export default SongHeader;
