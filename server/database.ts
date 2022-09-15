export default () => {
  const mongoose = require('mongoose');

  return new Promise((resolve, reject) => {
    mongoose.connection
      .on('error', error => {
        console.log('Error connect to database');
        reject(error);
      })
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => {
        console.info('MongoDB Connected...')
        return resolve(mongoose.connection)
      })
    mongoose.Promise = global.Promise
    mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true })
  });
}
