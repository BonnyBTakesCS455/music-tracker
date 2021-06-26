import { BACKEND_SERVER } from "./constants";
import Cookies from 'js-cookie';

export function getSongs(token) {
    console.log('services', token);
    return fetch(`${BACKEND_SERVER}/songs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token
        })
    }).then(data => {
        return data.json();
    }, err => {
        // TODO: Better way to handle token refresh
        Cookies.remove('spotifyAuthToken');
    });
};
