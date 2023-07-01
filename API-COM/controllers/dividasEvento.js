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

module.exports.deleteDivida = (id) => {
    return Divida.deleteOne({_id:id})
        .then(divida => {
            return divida
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getDividasByInscrito = (id) => {
    return Divida.find({codInscrito: id})
        .then(dividas => {
            return dividas
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getDividasByTransporte = (id) => {
    return Divida.find({codTransporte: id})
        .then(dividas => {
            return dividas
        })
        .catch(erro => {
            return erro
        })
}

module.exports.deleteDividaByInscrito = (id) => {
    return Divida.deleteMany({codInscrito: id})
        .then(resp => {
            return resp
        })
        .catch(erro => {
            return erro
        })
}

module.exports.deleteDividaByTransporte = (id) => {
    return Divida.deleteMany({codTransporte: id})
        .then(resp => {
            return resp
        })
        .catch(erro => {
            return erro
        })
}

module.exports.updateDivida = (id, divida) => {
    return Divida.updateOne({_id:id}, divida)
        .then(resp => {
            return resp
        })
        .catch(erro => {
            return erro
        })
}

module.exports.deleteDividaByTransporteUser = (id, userID) => {
    return Divida.deleteOne({codTransporte: id, userID: userID})
        .then(resp => {
            return resp
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getDividyByTransporteUser = (id, userID) => {
    return Divida.findOne({codTransporte: id, userID: userID})
        .then(resp => {
            return resp
        })
        .catch(erro => {
            return erro
        })
}



