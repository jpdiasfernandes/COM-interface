var mongoose = require('mongoose')

var stockSchema = new mongoose.Schema({
    tamanho:String,
    quantidade:Number
})

var equipamentoSchema = new mongoose.Schema({
    nome:String,
    tipo:String,
    custo:Number,
    desconto:Number,
    stock:[stockSchema]
})

module.exports = mongoose.model('equipamento',equipamentoSchema)