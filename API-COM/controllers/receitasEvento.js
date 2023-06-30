const Receita = require('../models/receitasEvento')

module.exports.addReceita = (receita) => {
    return Receita.create(receita)
        .then(receita => {
            return receita
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getReceitaById = (id) => {
    return Receita.findOne({ _id: id })
        .then(receita => {
            return receita
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getReceitasEventoUser = (codEvento, userID) => {
    return Receita.find({ userID: userID, codEvento: codEvento })
        .then(receita => {
            return receita
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getReceitasEventoUserApoio = (codEvento, userID, ApoioKm) => {
    return Receita.find({ userID: userID, codEvento: codEvento, ApoioKm: ApoioKm })
        .then(receita => {
            if (receita.length > 0) {
                return receita
            } else {
                throw new Error('Não existe receita para este evento')
            }
        })
        .catch(erro => {
            return erro
        })
}



