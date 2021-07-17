import { BACKEND_SERVER } from "./constants";
import Cookies from 'js-cookie';

export function getSongs(token) {
    return fetch(`${BACKEND_SERVER}/songs?token=${token}`)
    .then(data => {
        return data.json();
    }, err => {
        // TODO: Better way to handle token refresh
        Cookies.remove('spotifyAuthToken');
    });
};

export function getCurrentUserInfo(token) {
    return fetch(`${BACKEND_SERVER}/me?token=${token}`)
    .then(data => {
        return data.json();
    }, err => {
        // TODO: Better way to handle token refresh
        Cookies.remove('spotifyAuthToken');
    });
};