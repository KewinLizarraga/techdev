const mongoose = require('mongoose');
const { Schema } = mongoose;

const MoneyTypeSchema = new Schema({
  businesses: [{ type: Schema.Types.ObjectId, ref: 'Business' }],
  name: { type: String, required: true },
  charge_rate: Number
}, { timestamps: true });

mongoose.model('MoneyType', MoneyTypeSchema);
