const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds =20;

const userShema = mongoose.Schema({
    usuario:{
        type: String,
        require: true,
        unique: true
    },
    pass:{
        type: String,
        require: true
    },
    adminn:{
        type: String,
        require: true
    },
    admina:{
        type: String,
        require: true
    },
    admine: {
        type: Number,
        required: true
    },
    admins:{
        type: Boolean,
        required: true
    }
});

userShema.pre('save', function(next){
    if(this.isNew || this.isModified('pass')){
        const document = this;

        bcrypt.hash(document.pass, saltRounds, (err, hashedPass) =>{
            if(err){
                next(err);
            }else{
                document.pass = hashedPass;
                next();
            }
        });
    }else{
        next();
    }

});

userShema.methods.isCorrectPass = function(candidatepass, callback){
    bcrypt.compare(candidatepass, this.pass, function(err, same){
        if(err){
            callback(err);
        }else{
            callback(err, same);
        }
    });
}


mongoose.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform(_doc, ret) {
      // eslint-disable-next-line no-param-reassign,no-underscore-dangle
      ret.id = ret._id;
      delete ret._id;
    },
  });


module.exports = mongoose.model('admins', userShema);