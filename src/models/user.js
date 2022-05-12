const mongoose = require("mongoose");

const userShema = mongoose.Schema({
    nombre:{
        type: String,
        required:true
    },
    sexo:{
        type: Boolean,
        required: false
    },
    edad: {
        type: Number,
        required: true
    },
    correo:{
        type: String,
        required: false
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
// Ensure virtual fields are serialised.
mongoose.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform(_doc, ret) {
      // eslint-disable-next-line no-param-reassign,no-underscore-dangle
      ret.id = ret._id;
      delete ret._id;
    },
  });

module.exports = mongoose.model('Usuarios', userShema);

