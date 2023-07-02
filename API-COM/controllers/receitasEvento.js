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

module.exports.getReceitasByUser = (userID) => {
    return Receita.find({ userID: userID })
        .then(receita => {
            return receita
        })
        .catch(erro => {
            return erro
        })
}
module.exports.getReceitas = () => {
    return Receita.find()
        .then(receita => {
            return receita
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getReceitasByApoio = (apoioKm) => {
    return Receita.find({ codApoioKm: apoioKm })
        .then(receita => {
            return receita
        })
        .catch(erro => {
            return erro
        })
}

module.exports.updateReceita = (id, receita) => {
    return Receita.updateOne({ _id: id }, receita)
        .then(receita => {
            return receita
        })
        .catch(erro => {
            return erro
        })
}

module.exports.deleteReceita = (id) => {
    return Receita.deleteOne({ _id: id })
        .then(receita => {
            return receita
        })
        .catch(erro => {
            return erro
        })
}

module.exports.deleteReceitaByApoio  = (apoioKmId) => {
    return Receita.deleteMany({ codApoioKm: apoioKmId })
        .then(receita => {
            return receita
        })
        .catch(erro => {
            return erro
        })
}



