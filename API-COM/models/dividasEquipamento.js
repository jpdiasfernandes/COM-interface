var mongoose = require('mongoose')

var dividaEquipamentoSchema = new mongoose.Schema({
    codEquipamento:{type: mongoose.Schema.Types.ObjectId, ref: 'equipamento'},
    userID:String,
    estado:String,
    tamanho:String
})

module.exports = mongoose.model('dividasequipamento',dividaEquipamentoSchema)