import React, { useState } from "react";
import Song from "./Song";
import SongHeader from "./SongHeader";
import * as fakeSongs from "../fakedata/songs.json";
import styled from "styled-components";

// There are duplicates. Will need to remove via ID
const songs = fakeSongs.items;

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

function SongList(props) {
    // const [pic, setPic] = useState(props.pic);

    return (
        <SongDiv>
            <Table>
                <SongHeader />
                {songs.map((song, i) => (
                    <Song {...song.track} />
                ))}
            </Table>
        </SongDiv>
    );
}

export default SongList;
