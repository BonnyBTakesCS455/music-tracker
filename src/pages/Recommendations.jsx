import React, { useState, useEffect, useCallback } from "react";
import SongList from "../components/SongList";
import Button from "../components/Button";
import { getRecommendations, createPlaylistWithSongs } from "../services";
import Spinner from "../components/Spinner";

function Recommendations({ username, spotifyId }) {
  const [songs, setSongs] = useState([]);
  const [playlistLink, setPlaylistLink] = useState("");

  const fetchSongs = useCallback(() => {
    if (!spotifyId) return;
    getRecommendations(spotifyId).then((songs) => {
      if (songs.length) {
        setSongs(songs);
      }
    });
  }, [spotifyId]);

  useEffect(() => {
    if (!songs.length) {
      console.log("fetching recommended songs");
      fetchSongs();
    }
  }, [fetchSongs, songs]);

  // Taken from https://stackoverflow.com/a/63627688
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const createPlaylist = () => {
    if (!spotifyId || songs.length === 0) return;
    if (playlistLink !== "") {
      openInNewTab(playlistLink);
    } else {
      createPlaylistWithSongs(
        spotifyId,
        songs.map((song) => `spotify:track:${song.id}`),
        `${username}'s recent vibe recommendations`,
        `Recommended songs for ${username} based on most recently played songs and artists`
      ).then((data) => {
        openInNewTab(data.body.external_urls.spotify);
        setPlaylistLink(data.body.external_urls.spotify);
      });
    }
  };

  return (
    <React.Fragment>
      <header className="App-container">
        <h2>{`Recommendations for ${username}!`}</h2>
        <SongList songs={songs} showPlays={false} />
        <Button onClick={createPlaylist}>
          {playlistLink === "" ? "Create Playlist" : "Open Playlist"}
        </Button>
      </header>
      {!songs.length && <Spinner/>}
    </React.Fragment>
  );
}

export default Recommendations;
