const Divida = require('../models/dividasEvento')

module.exports.addDivida = async function(divida) {
    try {
        return await Divida.create(divida)
    } catch (erro) {
        return erro
    }
}

module.exports.getDivida = (id, userID) => {
    return Divida.findOne({ userID: userID, codEvento: id})
        .then(divida => {
            return divida
        })
        .catch(erro => {
            return erro
        })
}
module.exports.getDividaById = (dividaID) => {
    return Divida.findOne({_id:dividaID})
        .then(divida => {
            return divida
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getDividas = () => {
    return Divida.find({})
        .then(dividas => {
            return dividas
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getDividasEvento = (id) => {
    return Divida.find({codEvento: id})
        .then(dividas => {
            return dividas
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getDividasUser = (id) => {
    return Divida.find({userID: id})
        .then(dividas => {
            return dividas
        })
        .catch(erro => {
            return erro
        })
}



