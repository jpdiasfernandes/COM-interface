const Notificacao = require('../models/notificacao')

module.exports.getNotificacoes = (sort) =>{
    return Notificacao
        .find()
        .sort(sort)
        .then(dados =>{
            return dados
        })
        .catch(erro =>{
            return erro
        })
}

module.exports.addNotificacao = notificacao =>{
    return Notificacao
        .create(notificacao)
        .then(dados =>{
            return dados
        })
        .catch(erro =>{
            return erro
        })
}

module.exports.getNotificacao = id => {
    return Notificacao
        .findOne({
            _id:id,
        })
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.removeNotificacao = id => {
    return Notificacao.
        deleteOne({
            _id:id
        })
        .then(docs => {
            return docs
        })
        .catch(erro => {
            return erro
        })
}

module.exports.updateNotificacao = (id,notificacao) => {
    return Notificacao.
        updateOne({_id:id},notificacao)
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}