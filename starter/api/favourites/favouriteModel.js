import mongoose from 'mongoose';

const { Schema } = mongoose;

const FavouriteSchema = new Schema({
  username: { type: String, required: true },
  mediaType: { type: String },
  mediaId: { type: Number },
});

export default mongoose.model('Favourite', FavouriteSchema);
