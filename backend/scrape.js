const UserController = require('./controller/UserController');
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();

const scrape = async(spotifyId, token) => {
    const { lastScraped } = await UserController.directFindUserBySpotifyId(spotifyId)
    console.log('lastScraped', lastScraped)
    spotifyApi.setAccessToken(token);
    return spotifyApi
        .getMyRecentlyPlayedTracks({
            limit: 50,
            after: lastScraped || 0
        })
        .then(
            async (data) => {
                const ids = {}
                data.body.items.forEach(item => {
                // console.log(item.played_at)
                const id = `listenStats.${item.track.id}`
                if(ids[id]) {
                    ids[id] = ids[id].append(item.played_at);
                } else {
                    ids[id] = [item.played_at]
                }
                })
                // console.log(ids)
                const newLastScraped = data.body.cursors?.after || lastScraped
                console.log("Updating user last scraped", newLastScraped);
                UserController.directUpdateUserBySpotifyId(spotifyId, { lastScraped: newLastScraped, $push: ids} );
                return ['success', null]
            },
            (err) => {
                console.log('Something went wrong!');
                return [null, err]
            }
        );
}

module.exports = {
    scrape
}