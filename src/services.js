export function getSongs(spotifyId) {
    return fetch(`/songs?spotifyId=${spotifyId}`)
        .then(data => {
            return data.json();
        }, err => {
            console.log("something went wrong", err);
        });
};

export function login() {
    return fetch('/login')
        .then(data => {
            return data.json();
        }, err => {
            console.log('Something went wrong ', err);
            return err;
        });
}
