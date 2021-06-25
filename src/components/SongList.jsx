import React, { useState } from "react";
import Song from "./Song";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as fakeSongs from "../fakedata/songs.json";
import styled from "styled-components";

// There are duplicates. Will need to remove via ID
const songs = fakeSongs.items;

function SongList(props) {
  // const [pic, setPic] = useState(props.pic);

  const columns = [
    {
      name: "image",
      label: " ",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "song",
      label: "Song",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "artist",
      label: "Artist",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "time",
      label: "Time",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "plays",
      label: "Plays",
      options: {
        filter: false,
        sort: true,
      },
    },
  ];

  const options = {
    filter: false,
    print: false,
    search: false,
    download: false,
    viewColumns: false,
    selectableRowsHideCheckboxes: true,
  };

  function getArtistNames(track) {
    const artistNames = [];
    for (const artist of track.artists) {
      artistNames.push(artist.name);
    }
    const artistStr = artistNames.join(", ");
    return artistStr;
  }

  // From https://stackoverflow.com/a/21294619
  function convertMsToTime(duration_ms) {
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  function getMuiTheme() {
      const darkMode = true;
    if (darkMode) {
        return createMuiTheme({
              overrides: {
                  MUIDataTable: {
                    root: {
                        color: "#1DB954",
                        backgroundColor: "#262626"
                    }
                  },
                  MUIDataTableBody: {
                      root: {
                          color: "#262626",
                          backgroundColor: "#262626"
                      }
                  },
                MUIDataTableBodyCell: {
                  root: {
                    fontFamily: 'Gotham-light',
                    fontWeight: 'bold',
                    color: "#1DB954",
                  },
                },
                MUIDataTableHeadCell: {
                    root: {
                      fontFamily: 'Gotham-light',
                      fontWeight: 'bold'
                    },
                  },
              },
            });
    } else {
        return createMuiTheme({
              overrides: {
                MUIDataTableBodyCell: {
                  root: {
                    color: "#1DB954",
                    fontFamily: 'Gotham-light',
                    fontWeight: 'bold'
                  },
                },
                MUIDataTableHeadCell: {
                    root: {
                      fontFamily: 'Gotham-light',
                      fontWeight: 'bold'
                    },
                  },
              },
            });
    }
  }

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        data={songs.map((song) => {
          return {
            image: <img src={song.track.album.images[2].url} width={32} height={32} />,
            song: song.track.name,
            artist: getArtistNames(song.track),
            time: convertMsToTime(song.track.duration_ms),
            plays: 43,
          };
        })}
        columns={columns}
        options={options}
      />
    </MuiThemeProvider>
  );
}

export default SongList;
