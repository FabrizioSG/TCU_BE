
const mongoose = require("mongoose");

// schema de transaction
const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  description: {
    type: String,
    required: true
  },
  tab: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
},
  { timestamps: true }

);

module.exports = mongoose.model("Transaction", transactionSchema);