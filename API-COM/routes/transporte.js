var express = require('express');
var router = express.Router();

var Transporte = require('../controllers/transporte')
const Equipamento = require("../controllers/equipamento");

router.get('/:idTransporte', function(req, res, next) {
    Transporte.getTransporte(req.params.idTransporte)
        .then(dados => {
            res.status(201).json(dados)
        })
        .catch(error => {
            res.status(522).json({error:error,mensagem:"Erro na recuperação do Transporte"})
        })
})

router.get('/', function(req, res, next) {
    if (req.query.evento) {
        Transporte.getTransportes(req.query.evento)
            .then(dados => {
                res.status(201).json(dados)
            })
            .catch(error => {
                res.status(522).json({error:error,mensagem:"Erro na recuperação do Transporte"})
            })
    }
})



router.post('/', function(req, res, next) {
        console.log(req.body)
        Transporte.addTransporte(req.body)
            .then(dados => {
                res.status(201).json(dados)
            })
            .catch(error => {
                res.status(522).json({error:error,mensagem:"Erro na criação do Transporte"})
            })
})

router.delete('/:idTransporte', function(req, res, next) {
    Transporte.deleteTransporte(req.params.idTransporte)
            .then(dados => {
                res.status(200).json(dados)
            }).catch(error => {
                res.status(522).json({error:error,mensagem:"Erro na remoção do Transporte"})
            })
})

router.put('/:idTransporte', function(req, res, next) {
    Transporte.updateTransporte(req.params.idTransporte,req.body)
        .then(transporte => {
            res.status(200).json(transporte)
        })
        .catch(error => {
            res.status(524).json({error:error})
        })
});

module.exports = router;
