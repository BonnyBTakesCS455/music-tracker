import React from "react";
import { connect } from "react-redux";
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
  margin-left: -4px;
`;

const PlaysColumn = styled.div`
  display: table-cell;
  font-size: 18px;
  font-weight: bolder;
  width: 6%;
  margin-left: 4px;
  text-align: right;
`;

const SongRow = styled.div`
  display: flex;
  width: 100%;
  color: ${props => props.color};
  margin: 4px 4px 12px 0px;
  overflow: visible;
  line-height: normal;
  text-align: left;
`;

function mapStateToProps(state) {
    return {
      isDarkModeEnabled: state.userSettings.isDarkModeEnabled,
    };
  }

function SongHeader({ isDarkModeEnabled, showPlays }) {
  return (
    <SongRow color={isDarkModeEnabled? '#1DB954' : 'grey'}>
      <ImgDiv></ImgDiv>
      <SongColumn>Song</SongColumn>
      <ArtistColumn>Artist</ArtistColumn>
      <TimeColumn>Time</TimeColumn>
      {showPlays && <PlaysColumn>Plays</PlaysColumn>}
    </SongRow>
  );
}

export default connect(mapStateToProps, null)(SongHeader);
