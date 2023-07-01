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
    else if (req.query.inscrito) {
        Dividas.getDividasByInscrito(req.query.inscrito)
            .then(dados => {
                res.status(200).json(dados)
            })
            .catch(error => {
                res.status(522).json({error:error,mensagem:"Erro na recuperação da Divida"})
            })
    }
    else if (req.query.transporte && req.query.user) {
        Dividas.getDividyByTransporteUser(req.query.transporte, req.query.user)
            .then(dados => {
                res.status(200).json(dados)
            })
            .catch(error => {
                res.status(522).json({error:error,mensagem:"Erro na recuperação da Divida"})
            })
    }
    else if (req.query.transporte) {
        Dividas.getDividasByTransporte(req.query.transporte)
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

router.delete('/', async function(req, res, next) {
    if (req.query.inscrito)  {
        try {
            var dados = await Dividas.deleteDividaByInscrito(req.query.inscrito)
            res.status(200).json(dados)
        } catch (erro) {
            res.status(204).json({erro:erro,mensagem:"Erro na remoção da Divida"})
        }
    }
    else if (req.query.transporte && req.query.user) {
        try {
            var dados = await Dividas.deleteDividaByTransporteUser(req.query.transporte, req.query.user)
            res.status(200).json(dados)
        } catch (erro) {
            res.status(204).json({erro:erro,mensagem:"Erro na remoção da Divida"})
        }
    }
    else if (req.query.transporte) {
        try {
            var dados = await Dividas.deleteDividaByTransporte(req.query.transporte)
            res.status(200).json(dados)
        } catch (erro) {
            res.status(204).json({erro:erro,mensagem:"Erro na remoção da Divida"})
        }
    }
    else {
        res.status(204).json({mensagem:"Erro na remoção da Divida"})
    }

})

router.delete('/:idDivida', function(req, res, next) {
    Dividas.deleteDivida(req.params.idDivida)
        .then(dados => {
            res.status(200).json(dados)
        })
        .catch(error => {
            res.status(522).json({error:error,mensagem:"Erro na remoção da Divida"})
        })
})
router.post('/', function(req, res, next) {
        console.log(req.body)
        Dividas.addDivida(req.body)
            .then(dados => {
                res.status(201).json(dados)
            })
            .catch(error => {
                res.status(522).json({error:error,mensagem:"Erro na criação da Divida"})
            })
})

router.put('/:idDivida', function(req, res, next) {
    Dividas.updateDivida(req.params.idDivida, req.body)
        .then(dados => {
            res.status(201).json(dados)
        })
        .catch(error => {
            res.status(522).json({error:error,mensagem:"Erro na atualização da Divida"})
        })
})
module.exports = router;