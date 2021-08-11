import React, { useState, useEffect, useCallback } from "react";
import { getMinutes, getArtistListens } from "../services";
import Graph from "../components/Graph";
import { connect } from "react-redux";

function Insights({ spotifyId }) {
  const [minutes, setMinutes] = useState({});
  const [artists, setArtists] = useState({});
  console.log(minutes);

  const fetchInsights = useCallback(() => {
    if (!spotifyId) return;
    getMinutes(spotifyId).then((data) => {
      setMinutes(data);
    });
    getArtistListens("turntasian").then((data) => {
      setArtists(data);
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
