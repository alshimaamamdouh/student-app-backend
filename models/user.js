const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: '' },
  gender: { type: String, default: '' },
  age: { type: Number, default: '' },
  isAdmin: { type: Boolean, default: false },
  country: { type: String, default: '' },
}, { timestamps: true });

userSchema.set('toJSON', {virtuals: true,});
module.exports = mongoose.model('User', userSchema);

