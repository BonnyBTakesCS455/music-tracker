const mongoose = require('mongoose');
const { User } = require('../schema/User');
const { MONGO } = require('../secret');
const { scrape } = require('../scrape');

const MONGO_SECRET = process.env.MONGO_SECRET || MONGO;

mongoose.set('useFindAndModify', false);
mongoose.connect(MONGO_SECRET, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log('Scraping user stats')

const run = async() => {
    for await (const doc of User.find()) {
        console.log('scraping', doc.name, doc.spotifyId)
        await scrape(doc.spotifyId, doc.token)
    }
}

run().then(() => mongoose.connection.close())
