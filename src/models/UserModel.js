import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    default: 'guest'
  },
  email: {
    type:String,
    required: true
  },
  password: {
    type:String,
    required: true
  },
  image: {
    type: String,
    default: ''
  }
});

let Dataset = mongoose.models.users || mongoose.model('users', userSchema);

export default Dataset;