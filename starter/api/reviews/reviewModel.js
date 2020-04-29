/* eslint-disable linebreak-style */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  username: { type: String, required: true },
  mediaType: { type: String, required: true },
  mediaId: { type: Number, required: true },
  review: { type: String, required: true },
});

export default mongoose.model('Review', ReviewSchema);
