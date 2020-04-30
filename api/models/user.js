'use strict'

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
//
var UserSchema = Schema({ 
    name: String,
    surname: String,
    nick: String,
    email: String,
    password: String,
    role: String,
    image: String,  //se cambia la primera letra en mayuscula para que forme el esquema correctamente
});

module.exports = mongoose.model('User', UserSchema);