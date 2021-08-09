import React, { useState, useEffect, useCallback } from "react";
import { getInsights } from "../services";
import Graph from "../components/Graph";
import { connect } from "react-redux";

function Insights({ spotifyId }) {
  const [insights, setInsights] = useState({});
  console.log(insights);

  const fetchInsights = useCallback(() => {
    if (!spotifyId) return;
    getInsights(spotifyId).then((data) => {
      setInsights(data);
    });
  }, [spotifyId]);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  return (
    <React.Fragment>
      <header className="App-container">
        <h1>Insights</h1>
        <h1>{insights && insights.minutesListened}</h1>
        minutes listened in the past 24 hours
        <Graph />
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
