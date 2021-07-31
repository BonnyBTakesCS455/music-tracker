const mongoose = require('mongoose');
const { User } = require('../schema/User');
const { scrape } = require('../scrape');
// const { MONGO } = process.env.MONGO_SECRET;

mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGO_SECRET, {
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
