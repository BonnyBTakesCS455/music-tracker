import React, { useState } from "react";
import styled from 'styled-components';

const fakeSong = {
  "track": {
    "album": {
      "album_type": "single",
      "artists": [
        {
          "external_urls": {
            "spotify": "https://open.spotify.com/artist/6YxrfNCKBcQlbITpmDLErL"
          },
          "href": "https://api.spotify.com/v1/artists/6YxrfNCKBcQlbITpmDLErL",
          "id": "6YxrfNCKBcQlbITpmDLErL",
          "name": "Xuitcasecity",
          "type": "artist",
          "uri": "spotify:artist:6YxrfNCKBcQlbITpmDLErL"
        }
      ],
      "external_urls": {
        "spotify": "https://open.spotify.com/album/0mMvgkjJXcPOLIOesCYtiY"
      },
      "href": "https://api.spotify.com/v1/albums/0mMvgkjJXcPOLIOesCYtiY",
      "id": "0mMvgkjJXcPOLIOesCYtiY",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ab67616d0000b2737766f36b8b9da0c13ca6792c",
          "width": 640
        },
        {
          "height": 300,
          "url": "https://i.scdn.co/image/ab67616d00001e027766f36b8b9da0c13ca6792c",
          "width": 300
        },
        {
          "height": 64,
          "url": "https://i.scdn.co/image/ab67616d000048517766f36b8b9da0c13ca6792c",
          "width": 64
        }
      ],
      "name": "Misunderstood",
      "release_date": "2020-01-31",
      "release_date_precision": "day",
      "total_tracks": 1,
      "type": "album",
      "uri": "spotify:album:0mMvgkjJXcPOLIOesCYtiY"
    },
    "artists": [
      {
        "external_urls": {
          "spotify": "https://open.spotify.com/artist/6YxrfNCKBcQlbITpmDLErL"
        },
        "href": "https://api.spotify.com/v1/artists/6YxrfNCKBcQlbITpmDLErL",
        "id": "6YxrfNCKBcQlbITpmDLErL",
        "name": "Xuitcasecity",
        "type": "artist",
        "uri": "spotify:artist:6YxrfNCKBcQlbITpmDLErL"
      }
    ],
    "disc_number": 1,
    "duration_ms": 227866,
    "explicit": true,
    "external_ids": {
      "isrc": "QZ9ND2010120"
    },
    "external_urls": {
      "spotify": "https://open.spotify.com/track/5c38uvbdvtrco6KyvjFRHZ"
    },
    "href": "https://api.spotify.com/v1/tracks/5c38uvbdvtrco6KyvjFRHZ",
    "id": "5c38uvbdvtrco6KyvjFRHZ",
    "is_local": false,
    "name": "Misunderstood",
    "popularity": 56,
    "preview_url": "https://p.scdn.co/mp3-preview/6d77c6615d7ccfc7971a8e73de6b1f2a0d6c5726?cid=774b29d4f13844c495f206cafdad9c86",
    "track_number": 1,
    "type": "track",
    "uri": "spotify:track:5c38uvbdvtrco6KyvjFRHZ"
  },
  "played_at": "2021-05-31T23:45:59.451Z",
  "context": {
    "external_urls": {
      "spotify": "https://open.spotify.com/playlist/37i9dQZF1E8HjVOOo5kt3D"
    },
    "href": "https://api.spotify.com/v1/playlists/37i9dQZF1E8HjVOOo5kt3D",
    "type": "playlist",
    "uri": "spotify:playlist:37i9dQZF1E8HjVOOo5kt3D"
  }
}

const usefulFakeSongInfo = {
  "images": [
    {
      "height": 640,
      "url": "https://i.scdn.co/image/ab67616d0000b2737766f36b8b9da0c13ca6792c",
      "width": 640
    },
    {
      "height": 300,
      "url": "https://i.scdn.co/image/ab67616d00001e027766f36b8b9da0c13ca6792c",
      "width": 300
    },
    {
      "height": 64,
      "url": "https://i.scdn.co/image/ab67616d000048517766f36b8b9da0c13ca6792c",
      "width": 64
    }
  ],
  "name": "Misunderstood",
  "artists": [
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/6YxrfNCKBcQlbITpmDLErL"
      },
      "href": "https://api.spotify.com/v1/artists/6YxrfNCKBcQlbITpmDLErL",
      "id": "6YxrfNCKBcQlbITpmDLErL",
      "name": "Xuitcasecity",
      "type": "artist",
      "uri": "spotify:artist:6YxrfNCKBcQlbITpmDLErL"
    }
  ],
  "preview_url": "https://p.scdn.co/mp3-preview/6d77c6615d7ccfc7971a8e73de6b1f2a0d6c5726?cid=774b29d4f13844c495f206cafdad9c86",
  "duration_ms": 227866,
  "explicit": true,
  "external_ids": {
    "isrc": "QZ9ND2010120"
  },
  "external_urls": {
    "spotify": "https://open.spotify.com/track/5c38uvbdvtrco6KyvjFRHZ"
  }
}

const ImgDiv1 = styled.div`
    vertical-align: middle;
    float: left;
    margin: 10px 30px 10px 30px;
`;

const Div = styled.div`
    float: left;
    display: inline;
    vertical-align: middle;
    margin: 0px 30px 0px 30px;
`;

const ImgDiv = styled.div`
    display: table-cell;
    vertical-align: middle;
    font-size: 18px;
    font-weight: bold;
    width: 4%;
    padding: 0px 6px 0px 0px;
`;

const SongColumn = styled.div`
    display: table-cell;
    font-size: 18px;
    font-weight: bold;
    width: 40%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const ArtistColumn = styled.div`
    display: table-cell;
    font-size: 18px;
    font-weight: bold;
    width: 40%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const TimeColumn = styled.div`
    display: table-cell;
    font-size: 18px;
    font-weight: bold;
    width: 6%;
`;

const PlaysColumn = styled.div`
    display: table-cell;
    font-size: 18px;
    font-weight: bold;
    width: 6%;
`;

const SongRow = styled.div`
  display: table-row;
  width: 100%;
`;

// From https://stackoverflow.com/a/21294619
function convertMsToTime(duration_ms) {
  const minutes = Math.floor(duration_ms / 60000);
  const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function getArtistNames(songJson) {
  const artistNames = [];
  for (const artist of songJson.artists) {
    artistNames.push(artist.name);
  }
  const artistStr = artistNames.join(', ');
  return artistStr;
}

function getPlays() {
  return Math.floor(Math.random() * 100);
}

function Song(props) {
  // const [pic, setPic] = useState(props.pic);

  const time = convertMsToTime(props.duration_ms);

  return (
    <SongRow>
      <ImgDiv>
              <img src={props.album.images[2].url} width={32} height={32}/>
            </ImgDiv>
      <SongColumn>{props.name}</SongColumn>
      <ArtistColumn>{getArtistNames(props)}</ArtistColumn>
      <TimeColumn>{time}</TimeColumn>
      <PlaysColumn>{getPlays()}</PlaysColumn>
      </SongRow>
  );
  //     return (
  //       <div class="divTableRow">
  // <div class="divTableCell">cell1_1</div><div class="divTableCell">cell2_1</div><div class="divTableCell">cell3_1</div><div class="divTableCell">cell4_1</div></div>
  //     )
};

export default Song;