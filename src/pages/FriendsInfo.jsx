import React, { useCallback, useEffect, useState } from "react";
import { getSongs } from "../services";
import PageHeader from "../components/PageHeader";
import SongList from "../components/SongList";
import { connect } from "react-redux";
import Spinner from "../components/Spinner";

function FriendsInfo({ username, spotifyId }) {
  let [songs, setSongs] = useState([]);

  const fetchSongs = useCallback(() => {
    if (!spotifyId) return;
    getSongs(spotifyId).then((songs) => {
      if (songs.length) {
        setSongs(songs);
      }
    });
  }, [spotifyId]);

  useEffect(() => {
    setSongs([]);
    fetchSongs();
  }, [fetchSongs]);

  return (
    <React.Fragment>
      <header className="App-container">
        <PageHeader
          title={`Look at ${username}'s Top Songs!`}
          spotifyId={spotifyId}
        />
        <p>{username}'s most listened to songs:</p>
        <SongList songs={songs} showPlays={true} />
      </header>
      {!songs.length && <Spinner></Spinner>}
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userSettings.user,
  };
}

export default connect(mapStateToProps, null)(FriendsInfo);
