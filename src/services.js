import Cookies from 'js-cookie';

export function getSongs(token, spotifyId) {
    return fetch(`/songs?token=${token}&spotifyId=${spotifyId}`)
        .then(data => {
            return data.json();
        }, err => {
            // TODO: Better way to handle token refresh
            Cookies.remove('spotifyAuthToken');
        });
};

export function getCurrentUserInfo(token, refreshToken) {
    return fetch(`/me?token=${token}&refreshToken=${refreshToken}`)
        .then(data => {
            return data.json();
        }, err => {
            // TODO: Better way to handle token refresh
            Cookies.remove('spotifyAuthToken');
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

export function getTokens(code) {
    return fetch(`/gettokens?code=${code}`)
    .then(data => {
        return data.json();
    }, err => {
        console.log('Something went wrong ', err);
        return err;
    });
}