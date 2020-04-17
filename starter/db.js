import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Connect to database
console.log(process.env.mongoDB)
mongoose.connect(process.env.mongoDB);
const db = mongoose.connection;

db.on('error', (err) => {
    console.log(`database connection error: ${err.message}`);
});
db.on('disconnected', (e) => {
    console.log('database disconnected', e);
});
db.once('open', () => {
    console.log(`database connected to ${db.name} on ${db.host}`);
})