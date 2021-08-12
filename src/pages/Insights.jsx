import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { getMinutes, getArtistListens, getTopGenres, getMusicStats } from "../services";
import Graph from "../components/Graph";
import TopGenres from "../components/TopGenres";
import MusicStats from "../components/MusicStats";
import { connect } from "react-redux";

const Flexbox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function Insights({ spotifyId }) {
  const [minutes, setMinutes] = useState({});
  const [artists, setArtists] = useState({});
  const [genres, setGenres] = useState({});
  const [musicStats, setMusicStats] = useState({});

  const fetchInsights = useCallback(() => {
    if (!spotifyId) return;
    getMinutes(spotifyId).then((data) => {
      setMinutes(data);
    });
    getArtistListens(spotifyId).then((data) => {
      setArtists(data);
    });
    getTopGenres(spotifyId).then((data) => {
      setGenres(data);
    });
    getMusicStats(spotifyId).then((data) => {
        setMusicStats(data);
      });
  }, [spotifyId]);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  return (
    <React.Fragment>
      <header className="App-container">
        <h1>Insights</h1>
        <h1>{minutes && minutes.minutesListened}</h1>
        minutes listened in the past 24 hours
        <Graph artistData={artists} />
        <Flexbox>
            <TopGenres genres={genres} />
            <MusicStats musicStats={musicStats} />
        </Flexbox>
      </header>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userSettings.user,
  };
}

export default connect(mapStateToProps, null)(Insights);
