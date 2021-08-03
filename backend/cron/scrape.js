const mongoose = require('mongoose');
const { User } = require('../schema/User');
const { scrape } = require('../scrape');

mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGO_SECRET, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log('Scraping user stats')

const run = async() => {
  for await (const doc of User.find()) {
    console.log('scraping', doc.name, doc.spotifyId)
    scrape(doc.spotifyId)
  }
}

run()

setTimeout(mongoose.connection.close(), 20 * 1000); // close connection after x seconds LMAO