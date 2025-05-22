const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Budget', budgetSchema);