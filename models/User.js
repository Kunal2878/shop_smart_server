import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
 Email: {
    unique: true,
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);



export default User;

