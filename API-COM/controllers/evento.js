var Evento = require('../models/evento')
var Inscrito = require('../models/inscrito')
var Transporte = require('../models/transporte')
var ApoioKm = require('../models/apoioKm')

module.exports.getEventos = () => {
    return Evento
        .find()
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.addEvento = evento => {
    return Evento
        .create(evento)
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getEvento = id => {
    return Evento
        .findOne({
            _id: id,
        })
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.removeEvento = id => {
    return Evento.
        deleteOne({
            _id: id
        })
        .then(docs => {
            return docs
        })
        .catch(erro => {
            return erro
        })
}

module.exports.updateEvento = (id, evento) => {
    return Evento.
        updateOne({ _id: id }, evento)
        .then(evento => {
            return evento
        })
        .catch(erro => {
            return erro
        })
}
