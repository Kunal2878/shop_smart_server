import mongoose from 'mongoose';
const otpschema = new mongoose.Schema({
  otp: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});
const Otp=mongoose.model('Otp',otpschema);
export default Otp;