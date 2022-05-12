const mongoose = require("mongoose");

const userShema = mongoose.Schema({
    nombre:{
        type: String,
        required:true
    },
    sexo:{
        type: Boolean,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    correo:{
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        required: true
    },
    VuM: {
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model('Usuarios', userShema);