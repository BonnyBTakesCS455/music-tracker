import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import {
  getMinutes,
  getArtistListens,
  getTopGenres,
  getMusicStats,
} from "../services";
import Graph from "../components/Graph";
import TopGenres from "../components/TopGenres";
import MusicStats from "../components/MusicStats";
import { connect } from "react-redux";

const Flexbox = styled.div`
  display: flex;
  justify-content: center;
`;

const Paragraph = styled.span`
  display: inline;
  vertical-align: bottom;
`;

const Minutes = styled.h2`
  display: inline;
  vertical-align: bottom;
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
        <div style={{ display: "inline" }}>
          <Minutes>{minutes && minutes.minutesListened}</Minutes>{" "}
          <Paragraph>minutes listened in the past 24 hours.</Paragraph>
        </div>
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
