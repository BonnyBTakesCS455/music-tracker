import React from "react";
import Song from "./Song";
import SongHeader from "./SongHeader";
import styled from "styled-components";

// There are duplicates. Will need to remove via ID
// import * as fakeSongs from "../fakedata/songs.json";
// const songs = fakeSongs.items;

const Table = styled.div`
  display: table;
  table-layout: fixed;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  width: 100%;
  min-width: 800px;
`;

const SongDiv = styled.div`
  display: table;
  table-layout: fixed;
  font-size: 18px;
  font-weight: bold;
  width: 50%;
`;

function SongList({ songs, showPlays }) {
    return (
        <SongDiv>
            <Table>
                <SongHeader showPlays={showPlays} />
                {songs.map((song, i) => (
                    <Song key={i} {...song} showPlays={showPlays} />
                ))}
            </Table>
        </SongDiv>
    );
}

export default SongList;
