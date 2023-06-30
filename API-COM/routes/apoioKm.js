var express = require('express');
var router = express.Router();
var Apoio = require('../controllers/apoioKm')

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.query.evento) {
        Apoio.getApoiosFromEvento(req.query.evento)
            .then(dados => {
                res.status(200).json(dados)
            })
            .catch(error => {
                res.status(521).json({error:error,mensagem:"Erro na recuperação dos Apoios"})
            })
    } else {
        Apoio.getApoioKms()
            .then(dados => {
                res.status(200).json(dados)
            })
            .catch(error => {
                res.status(521).json({error:error,mensagem:"Erro na recuperação dos Apoios"})
            })
    }
});

router.get('/:idApoioKm', function(req, res, next) {
   Apoio.getApoioKmById(req.params.idApoioKm)
       .then(dados => {
           res.status(200).json(dados)
       })
       .catch(error => {
           res.status(521).json({error:error,mensagem:"Erro na recuperação do Apoio"})
       })
})

router.post('/', function(req, res, next) {
    Apoio.addApoioKm(req.body)
        .then(dados => {
            res.status(201).json(dados)
        })
        .catch(error => {
            res.status(522).json({error:error,mensagem:"Erro na criação do Apoio"})
        })
})

router.delete('/:idApoio', function(req, res, next) {
    Apoio.removeApoio(req.params.idApoio)
        .then(dados => {
            res.status(200).json(dados)
        })
        .catch(error => {
            res.status(204).json({error:error,mensagem:"Erro na remoção do Apoio"})
        })
})

module.exports = router;
