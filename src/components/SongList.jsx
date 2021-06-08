import React, { useState } from "react";
import Song from "./Song";
import SongHeader from "./SongHeader";
import * as fakeSongs from '../fakedata/songs.json';
import styled from 'styled-components';

// There are duplicates. Will need to remove via ID
const songs = fakeSongs.items;


const Table = styled.div`
    display: table;
    table-layout: fixed;
    font-size: 18px;
    font-weight: bold;
    text-align: left;
`;

const SongDiv = styled.div`
    display: table;
    table-layout: fixed;
    font-size: 18px;
    font-weight: bold;
`;

function SongList(props) {
    // const [pic, setPic] = useState(props.pic);

    return (
        <SongDiv>
            <SongHeader />
            <Table>
                {songs.map((s, i) => <Song {...s.track} />)}
            </Table>
        </SongDiv>
    );
};

export default SongList;