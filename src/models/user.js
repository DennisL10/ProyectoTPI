const mongoose = require("mongoose");

const userShema = mongoose.Schema({
    nombre:{
        type: String,
        required:true
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
    }
});

module.exports = mongoose.model('Usuarios', userShema);