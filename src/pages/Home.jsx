import React, { useState, useEffect, useCallback } from 'react';
import SongList from '../components/SongList';
import PageHeader from '../components/PageHeader';
import { connect } from 'react-redux';
import { getSongs } from '../services';

function Home({ username, spotifyId, user }) {
  const [songs, setSongs] = useState([]);

  const fetchSongs = useCallback(() => {
      if (!spotifyId) return;
      getSongs(spotifyId)
          .then(songs => {
              if (songs.length) {
                  setSongs(songs)
              }
          })
  }, [spotifyId]);

  useEffect(() => {
      if (!songs.length) {
          console.log('fetching songs')
          fetchSongs()
    }
  }, [fetchSongs, songs])


  return (
    <React.Fragment>
      <header className='App-header'>
        <PageHeader title={`Hey ${username}!`} />
        <SongList songs={songs} showPlays={true} />
      </header>
    </React.Fragment>
  );
}


function mapStateToProps(state) {
  return {
    user: state.userSettings.user,
  };
}

export default connect(mapStateToProps, null)(Home);
