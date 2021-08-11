import React, { useState, useEffect, useCallback } from "react";
import { getInsights } from "../services";
import Graph from "../components/Graph";
import TopArtists from "../components/TopArtists";
import TopGenres from "../components/TopGenres";
import { connect } from "react-redux";

function Insights({ spotifyId }) {
  const [insights, setInsights] = useState({});

  const fetchInsights = useCallback(() => {
    if (!spotifyId) return;
    getInsights(spotifyId).then((data) => {
      setInsights(data);
    });
  }, [spotifyId]);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  const getGenres = (artists) => {
    const genres = {};
    if (!artists) return;
    artists.forEach((artist) => {
      if (!artist.genres) return;
      artist.genres.forEach((genre) => {
        if (genre in genres) {
          genres[genre] += 1;
        } else {
          genres[genre] = 1;
        }
      });
    });
    return genres;
  };

  return (
    <React.Fragment>
      <header className="App-container">
        <h1>Insights</h1>
        <h1>{insights && insights.minutesListened}</h1>
        minutes listened in the past 24 hours
        <Graph />
        {insights && insights.topArtists && (
          <>
            <TopArtists artists={insights.topArtists} />
            <TopGenres genres={getGenres(insights.topArtists)} />
          </>
        )}
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
