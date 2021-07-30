export function getSongs(spotifyId) {
    return fetch(`/songs?spotifyId=${spotifyId}`)
        .then(data => {
            return data.json();
        }, (err) => {
            console.log("something went wrong", err);
            throw err;
        });
};

export function getRecommendations(spotifyId) {
    return fetch(`/recommendations?spotifyId=${spotifyId}`)
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
    return fetch(`/createplaylist?spotifyId=${spotifyId}`, {
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
    return fetch('/login')
        .then(data => {
            return data.json();
        }, (err) => {
            console.log('Something went wrong ', err);
            throw err;
        });
}

export function friends(spotifyId) {
    return fetch(`/friends?id=${spotifyId}`)
        .then(data => {
            return data.json();
        }, err => {
            console.log('Something went wrong ', err);
            return err;
        });
}

