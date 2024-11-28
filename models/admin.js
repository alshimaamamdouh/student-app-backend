const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

adminSchema.set('toJSON', {virtuals: true,});
module.exports = mongoose.model('Admin', adminSchema);

