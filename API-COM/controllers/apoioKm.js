const ApoioKm = require("../models/apoioKm");
module.exports.addApoioKm = async function(apoioKm)  {
    try {
        return await ApoioKm.create(apoioKm)
    } catch (erro) {
        return erro
    }
}

module.exports.getApoioKm = (id, userID) => {
    return ApoioKm.findOne({ userID: userID, codEvento: id})
        .then(apoioKm => {
            return apoioKm
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getApoioKmById = (apoioKmID) => {
    return ApoioKm.findOne({_id:apoioKmID})
        .then(apoioKm => {
            return apoioKm
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getApoioKms = () => {
    return ApoioKm.find({})
        .then(apoioKms => {
            return apoioKms
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getApoiosFromEvento = (codEvento) => {
    return ApoioKm.find({codEvento : codEvento})
        .then(apoioKms => {
            return apoioKms
        })
        .catch(erro => {
            return erro
        })
}

module.exports.removeApoio = (id) => {
    return ApoioKm.deleteOne({_id : id})
        .then(apoioKms => {
            return apoioKms
        })
        .catch(erro => {
            return erro
        })
}

module.exports.updateApoio = (id, apoioKm) => {
    return ApoioKm.updateOne({ _id: id }, apoioKm)
        .then(apoioKm => {
            return apoioKm
        })
        .catch(erro => {
            return erro
        })
}