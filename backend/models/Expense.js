const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  category: { type: String, required: true, enum: ['Food', 'Books', 'Transport', 'Other'] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Expense', expenseSchema);