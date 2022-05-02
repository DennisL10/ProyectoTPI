const mongoose = require("mongoose");

const userShema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    age: {
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userShema);