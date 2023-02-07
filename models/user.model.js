
const mongoose = require("mongoose");

// schema de usuario
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  first_last_name: { type: String, required: true },
  second_last_name: { type: String },
  cedula: { type: String },
  rol: { type: String },
  estado_civil: { type: String },
  nacionalidad: { type: String },
  condicion_laboral: { type: String },
  grado_academico: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, minlength: 6 },
  birthday: { type: Date, },
  gender: { type: String, },
  familia: [{
    cantidad: String,
    ingreso_bruto: String,
    ingreso_neto: String,
    adicionales: String,
    dependencia: String
  }],
  salud: [{
    discapacidad: String,
    cronica: String,
    terminal: String,
    detalles: String,
  }],
  objetivos: [{
    corto: String,
    mediano: String,
    largo: String,
    diagnostico: String,
  }],
  casilla_feliz: [{
    salario_neto: String,
    otros_ingresos: String,
    ahorros: String,
    deudas: [{nombre: String,monto: String}],
    recurrentes: [{nombre: String,monto: String, mes: String}],
  }],
  plan_deuda: [{
    emisor: String,
    saldo_actual: String,
    tasa_actual: String,
    plazo_actual: String,
    descripcion: String,
    ponderado_tasa: String,
    ponderado_plazo: String
  }],
  patrimonio: [{
    activos: [{nombre: String,monto: String, mes: String}],
    activo_circulante: [{nombre: String,monto: String, mes: String}],
    pasivos_corto_plazo: [{nombre: String,monto: String, mes: String}],
    pasivos_largo_plazo: [{nombre: String,monto: String, mes: String}],
  }],
},
  { timestamps: true }

);

module.exports = mongoose.model("User", userSchema);