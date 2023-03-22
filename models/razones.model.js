
const mongoose = require("mongoose");

// schema de transaction
const RazonesSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  calculo: { type: String, required: true },
  observacion: { type: String, required: true },
},
  { timestamps: true }

);

module.exports = mongoose.model("Razones", RazonesSchema);