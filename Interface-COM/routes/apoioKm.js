/*
    Módulo inscrito.js

    descrição: rotas associadas às inscrições do sistema
    Estas rotas envolvem:
        - registo de uma inscrição num evento(para diretores e sócios);
        - listagem das inscrições num evento(para diretores e sócios);
        - Remoção de uma inscrição (para sócios);
        - Edição de uma inscrição
 */

var express = require('express');
var router = express.Router();
var axios = require('axios')
var auth = require('../helpers/auth')

router.post('/', auth.verificaAcessoDiretor, function(req, res, next) {
    axios.post('http://localhost:7779/apoioKm', req.body)
        .then(resp =>{
            res.redirect('/evento/' + req.body.codEvento)
        })
        .catch( erro => {
            res.render('error', {error: erro, message: "Erro!"})
        })
})

router.get('/remover/:idApoioKm', auth.verificaAcessoDiretor, async function(req, res, next) {
    try {
        var apoioRep = await axios.get('http://localhost:7779/apoioKm/' + req.params.idApoioKm)
        var apoio = apoioRep.data

        await axios.delete('http://localhost:7779/apoioKm/' + req.params.idApoioKm)
        res.redirect('/evento/' + apoio.codEvento)
    } catch (erro) {
        res.render('error', {error: erro, message: "Erro!"})
    }
})

router.get('/:idApoioKm', auth.verificaAcessoDiretor, async function(req, res, next) {
    try {
        var apoioRep = await axios.get('http://localhost:7779/apoioKm/' + req.params.idApoioKm)
        var apoio = apoioRep.data

        var socioRep = await axios.get('http://localhost:7780/user/socio/' + apoio.userID)
        var socio = socioRep.data

        var nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
        res.render('apoioKmDiretoria', {apoio: apoio, nivelAcesso : nivelAcesso, socio: socio})
    } catch (erro) {
        res.render('error', {error: erro, message: "Erro!"})
    }
})

module.exports = router
