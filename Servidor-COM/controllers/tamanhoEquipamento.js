var TamanhoEquipamento = require('../models/tamanhoEquipamento')

module.exports.getTamanhoEquipamentos = () =>{
    return TamanhoEquipamento
        .find({},{_id:0,tamanho:1})
        .then(dados =>{
            return dados
        })
        .catch(erro =>{
            return erro
        })
}