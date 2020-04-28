import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  username : { type: String},
  mediaType : { type: String},
  mediaId : { type: Number},
  review : {type: String}
})

export default mongoose.model('Review', ReviewSchema);