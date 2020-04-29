/* eslint-disable no-console */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Mockgoose } from 'mockgoose';

dotenv.config();

// Connect to database
if (process.env.NODE_ENV === 'test') {
  // use mockgoose for testing
  const mockgoose = new Mockgoose(mongoose);
  mockgoose.prepareStorage().then(() => {
    mongoose.connect(process.env.mongoDB);
  });
} else {
  // use the real deal for everything else
  mongoose.connect(process.env.mongoDB);
  mongoose.set('useFindAndModify', false);
}


// Connect to database
console.log(process.env.mongoDB);
// mongoose.connect(process.env.mongoDB);
// mongoose.set('useFindAndModify', false);
const db = mongoose.connection;

db.on('error', (err) => {
  console.log(`database connection error: ${err.message}`);
});
db.on('disconnected', (e) => {
  console.log('database disconnected', e);
});
db.once('open', () => {
  console.log(`database connected to ${db.name} on ${db.host}`);
});
