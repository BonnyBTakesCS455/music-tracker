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
  await Promise.all(User.find().map(doc => {
    console.log('scraping', doc.name, doc.spotifyId)
    return scrape(doc.spotifyId)
  }))
}

run().finally(() => mongoose.connection.close())
