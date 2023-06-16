var mongoose = require('mongoose')

var tamanhoEquipamentoSchema = new mongoose.Schema({
    tamanho:String
})

module.exports = mongoose.model('tamanhosequipamento',tamanhoEquipamentoSchema)