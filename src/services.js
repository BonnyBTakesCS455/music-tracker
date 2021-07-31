const API = "https://cpsc-455-music-tracker.herokuapp.com"

export function getSongs(spotifyId) {
    return fetch(`${API}/songs?spotifyId=${spotifyId}`)
        .then(data => {
            return data.json();
        }, (err) => {
            console.log("something went wrong", err);
            throw err;
        });
};

export function getRecommendations(spotifyId) {
    return fetch(`${API}/recommendations?spotifyId=${spotifyId}`)
        .then(data => {
            return data.json();
        }, (err) => {
            console.log("something went wrong", err);
            throw err;
        });
};

export function createPlaylistWithSongs(spotifyId, songIds, playlistTitle, playlistDescription) {
    const data = {
        spotifyId, songIds, playlistTitle, playlistDescription
    };
    return fetch(`${API}/createplaylist?spotifyId=${spotifyId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(data => {
        return data.json();
    }, (err) => {
        console.log("something went wrong", err);
        throw err;
    })
}

export function login() {
    return fetch('${API}/login')
        .then(data => {
            return data.json();
        }, (err) => {
            console.log('Something went wrong ', err);
            throw err;
        });
}

export function friends(spotifyId) {
    return fetch(`${API}/friends?id=${spotifyId}`)
        .then(data => {
            return data.json();
        }, err => {
            console.log('Something went wrong ', err);
            return err;
        });
}

