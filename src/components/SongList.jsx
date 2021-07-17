import React, { useState, useEffect, useCallback } from "react";
import Song from "./Song";
import SongHeader from "./SongHeader";
import styled from "styled-components";
import { getSongs } from "../services";

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

function SongList({token, spotifyId}) {
    const [songs, setSongs] = useState([]);

    const fetchSongs = useCallback(() => {
        if (!token) return;
        getSongs(token, spotifyId)
            .then(songs => {
                if (songs.length) {
                    setSongs(songs)
                }
            })
    }, [token]);

    useEffect(() => {
        if (!songs.length) {
            console.log('fetching songs')
            fetchSongs()
        }
    }, [fetchSongs, songs])

    return (
        <SongDiv>
            <Table>
                <SongHeader />
                {songs.map((song, i) => (
                    <Song key={i} {...song} />
                ))}
            </Table>
        </SongDiv>
    );
}

export default SongList;
