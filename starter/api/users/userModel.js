import mongoose from 'mongoose';


const { Schema } = mongoose;


const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: false },
});

// eslint-disable-next-line func-names
UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username });
};

export default mongoose.model('User', UserSchema);
