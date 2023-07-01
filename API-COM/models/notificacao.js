var mongoose = require('mongoose')

var notificacaoSchema = new mongoose.Schema({
    titulo:String,
    mensagem:String,
    data:Date,
})

module.exports = mongoose.model('notificacao',notificacaoSchema)