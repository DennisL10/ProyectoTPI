const mongoose = require("mongoose");
const bcrypt = require('bcrypt');



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
    bcrypt.genSalt(10).then(salts => {
        bcrypt.hash(this.pass, salts).then(hash => {
            this.pass = hash;
            next();
        }).catch(error => next(error));
    }).catch(error => next(error));

});

userShema.pre('updateOne', function(next){
    bcrypt.genSalt(10).then(salts => {
        bcrypt.hash(this.pass, salts).then(hash => {
            this.pass = hash;
            next();
        }).catch(error => next(error));
    }).catch(error => next(error));


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