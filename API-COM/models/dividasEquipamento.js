var mongoose = require('mongoose')

var dividaEquipamentoSchema = new mongoose.Schema({
    codEquipamento:String,
    userID:String,
    estado:String
})

module.exports = mongoose.model('dividasequipamento',dividaEquipamentoSchema)