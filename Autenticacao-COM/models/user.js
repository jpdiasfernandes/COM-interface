var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose')

var User = new Schema({
    username: String,
    password: String,
    nome: String,
    nivel: String,
    active: Boolean, 
    dateCreated: String,
    nFPO: String,
    nSocio:String,
    idade:Number,
    sexo:String,
    cc:String,
    email:String,
    telFixo:String,
    telMovel:String,
    morada:String
})

User.plugin(passportLocalMongoose) 

module.exports = mongoose.model('user', User)