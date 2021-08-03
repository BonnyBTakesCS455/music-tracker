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
  const tasks = []
  for await (const doc of User.find()) {
    console.log('scraping', doc.name, doc.spotifyId)
    tasks.push(scrape(doc.spotifyId))
  }

  return await Promise.all(tasks)
}

run().finally(() => mongoose.connection.close())
