var express = require('express');
var router = express.Router();
var Dividas = require('../controllers/dividasEvento')

router.get('/', function(req, res, next) {
    if (req.query.evento && req.query.user) {
        Dividas.getDivida(req.query.evento, req.query.user)
            .then(dados => {
                res.status(200).json(dados)
            })
            .catch(error => {
                res.status(522).json({error:error,mensagem:"Erro na recuperação da Divida"})
            })
    }
    else {
        Dividas.getDividas()
            .then(dados => {
                res.status(200).json(dados)
            })
            .catch(erro => {
                res.status(520).json({erro:erro,mensagem:"Erro na listagem das Dividas"})
            })
    }
})

router.post('/', function(req, res, next) {
        Dividas.addDivida(req.body)
            .then(dados => {
                res.status(201).json(dados)
            })
            .catch(error => {
                res.status(522).json({error:error,mensagem:"Erro na criação da Divida"})
            })
})
