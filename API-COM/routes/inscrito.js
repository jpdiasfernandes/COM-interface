var express = require('express');
var router = express.Router();

var Inscrito = require('../controllers/inscrito')

router.get('/', function(req, res, next) {
    if (req.query.evento && req.query.user) {
        Inscrito.getInscrito(req.query.evento, req.query.user)
            .then(dados => {
                res.status(201).json(dados)
            })
            .catch(error => {
                res.status(522).json({error:error,mensagem:"Erro na recuperação do Inscrito"})
            })
    }
    else if (req.query.evento) {
        Inscrito.getInscritosByEvento(req.query.evento)
            .then(dados => {
                res.status(201).json(dados)
            })
            .catch(error => {
                res.status(522).json({error:error,mensagem:"Erro na recuperação do Inscrito do evento selecionado"})
            })
    } else {
        Inscrito.getInscritos()
            .then(dados => {
                res.status(201).json(dados)
            })
            .catch(error => {
                res.status(522).json({error:error,mensagem:"Erro na recuperação dos Inscritos"})
            })
    }
})

router.get('/:inscritoID', function(req, res, next) {
    Inscrito.getInscritoById(req.params.inscritoID)
        .then(dados => {
            res.status(201).json(dados)
        })
        .catch(error => {
            res.status(522).json({error:error,mensagem:"Erro na recuperação do Inscrito"})
        })
})

router.post('/', function(req, res, next) {
        Inscrito.addInscrito(req.body)
            .then(dados => {
                res.status(201).json(dados)
            })
            .catch(error => {
                res.status(522).json({error:error,mensagem:"Erro na criação do Inscrito"})
            })
})

router.delete('/', function(req, res, next) {
        if (req.query.evento && req.query.socio) {
            Inscrito.deleteInscritoByEventSocio(req.query.evento, req.query.socio)
                .then(dados => {
                    res.status(200).json(dados)
                }).catch(error => {
                res.status(204).json({error: error, mensagem: "Erro na remoção do Inscrito"})
            })
        } else {
            res.status(204).json({error: error, mensagem: "Erro na remoção do Inscrito"})
        }
    }
)



module.exports = router;
