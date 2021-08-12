import React, { useState, useEffect, useCallback } from "react";
import SongList from "../components/SongList";
import PageHeader from "../components/PageHeader";
import { connect } from "react-redux";
import { getSongs } from "../services";
import Spinner from "../components/Spinner";

function Home({ username, spotifyId, user }) {
  const [songs, setSongs] = useState([]);

  const fetchSongs = useCallback(() => {
    if (!spotifyId) return;
    getSongs(spotifyId).then((songs) => {
      if (songs.length) {
        setSongs(songs);
      }
    });
  }, [spotifyId]);

  useEffect(() => {
    if (!songs.length) {
      fetchSongs();
    }
  }, [fetchSongs, songs]);

  return (
    <React.Fragment>
      <header className="App-container">
        <PageHeader title={`Hey ${username}!`} />
        <p>Your most listened to songs:</p>
        <SongList songs={songs} showPlays={true} />
      </header>
      {!songs.length && <Spinner />}
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userSettings.user,
  };
}

export default connect(mapStateToProps, null)(Home);
