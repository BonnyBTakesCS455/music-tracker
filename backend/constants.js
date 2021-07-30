const { SPOTIFY_CLIENT_SECRET } = require('../backend/secret');

module.exports = {
    FRONTEND_SERVER: 'http://localhost:3000',
    CLIENT_ID: 'f943ad62119e426e878c674c01de2358',
    REDIRECT_URI: 'http://localhost:5000/callback',
    SCOPES: {
        ugcImageUpload: 'ugc-image-upload',
        userFollowRead: 'user-follow-read',
        userFollowModify: 'user-follow-modify',
        userReadRecentlyPlayed: 'user-read-recently-played',
        userTopRead: 'user-top-read',
        userReadPlaybackPosition: 'user-read-playback-position',
        userLibraryRead: 'user-library-read',
        userLibraryModify: 'user-library-modify',
        userReadPlaybackState: 'user-read-playback-state',
        userReadCurrentlyPlaying: 'user-read-currently-playing',
        userModifyPlaybackState: 'user-modify-playback-state',
        playlistReadCollaborative: 'playlist-read-collaborative',
        playlistModifyPrivate: 'playlist-modify-private',
        playlistModifyPublic: 'playlist-modify-public',
        playlistReadPrivate: 'playlist-read-private',
        streaming: 'streaming',
        appRemoteControl: 'app-remote-control',
        userReadEmail: 'user-read-email',
        userReadPrivate: 'user-read-private'
    },
    SPOTIFY_CLIENT_SECRET: SPOTIFY_CLIENT_SECRET
}