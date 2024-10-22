const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  richDescription: { type: String, default: '' },
  image: { type: String, default: '' },
  images: [{ type: String }],
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // Adding discount
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  dateCreated: { type: Date, default: Date.now },
}, { timestamps: true });

productSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

productSchema.set('toJSON', {
  virtuals: true,
});
module.exports = mongoose.model('Product', productSchema);
