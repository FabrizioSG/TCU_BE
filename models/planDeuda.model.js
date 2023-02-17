
const mongoose = require("mongoose");

// schema de transaction
const planDeudaSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  emisor: {
    type: String,
    required: true
  },
  saldoActual: {
    type: String,
    required: true
  },
  tasaActual: {
    type: Number,
    required: true
  },
  plazoActual: {
    type: String,
    required: true
  },
  descripcion: { type: String},
  ponderado_tasa: { type: String},
  ponderado_plazo: { type: String},
},
  { timestamps: true }

);

module.exports = mongoose.model("PlanDeuda", planDeudaSchema);