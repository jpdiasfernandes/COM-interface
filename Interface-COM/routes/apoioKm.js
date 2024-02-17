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

function getValorApoio(atletas, distancia) {
    var tabelaKm = new Map()
    tabelaKm.set(1, 0.05)
    tabelaKm.set(2, 0.07)
    tabelaKm.set(3, 0.09)
    tabelaKm.set(4, 0.11)
    tabelaKm.set(5, 0.13)
    tabelaKm.set(6, 0.18)

    if (atletas > 6) {
        tabelaKm.set(Number(atletas), 0.18)
    }

    console.log(atletas)
    console.log(tabelaKm.get(atletas))
    console.log(distancia)
    return distancia * tabelaKm.get(Number(atletas))
}

router.post('/', auth.verificaAcessoDiretor, async function(req, res, next) {
    var user = auth.getUser(req.cookies.token)
    try {
        var apoioKmRep = await axios.post('http://api:7779/apoioKm', req.body)
        var apoioKm = apoioKmRep.data

        console.log(apoioKm)
        if (apoioKm.atletas > 0 && apoioKm.distancia > 0) {
            var receita = {
                codEvento: apoioKm.codEvento,
                codApoioKm: apoioKm._id,
                userID : apoioKm.userID,
                valor : getValorApoio(apoioKm.atletas, apoioKm.distancia)
            }

            var receitaRep = await axios.post('http://api:7779/receitaEvento', receita)
            console.log(receitaRep.data)
        }

        res.redirect('/evento/' + req.body.codEvento)
    } catch(erro) {
        res.render('error', {error: erro, message: "Erro!", user: user})
    }
})

router.get('/remover/:idApoioKm', auth.verificaAcessoDiretor, async function(req, res, next) {
    var user = auth.getUser(req.cookies.token)
    try {
        var apoioRep = await axios.get('http://api:7779/apoioKm/' + req.params.idApoioKm)
        var apoio = apoioRep.data

        await axios.delete('http://api:7779/receitaEvento?apoio=' + apoio._id)

        await axios.delete('http://api:7779/apoioKm/' + req.params.idApoioKm)
        res.redirect('/evento/' + apoio.codEvento)
    } catch (erro) {
        res.render('error', {error: erro, message: "Erro!", user:user})
    }
})

router.get('/:idApoioKm', auth.verificaAcessoDiretor, async function(req, res, next) {
    var user = auth.getUser(req.cookies.token)
    try {
        var apoioRep = await axios.get('http://api:7779/apoioKm/' + req.params.idApoioKm)
        var apoio = apoioRep.data

        var socioRep = await axios.get('http://autenticacao:7780/user/socio/' + apoio.userID)
        var socio = socioRep.data

        var nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
        res.render('apoioKmDiretoria', {apoio: apoio, nivelAcesso : nivelAcesso, socio: socio, user: user})
    } catch (erro) {
        res.render('error', {error: erro, message: "Erro!", user:user})
    }
})

router.get('/editar/:idApoioKm', auth.verificaAcessoDiretor, async function(req, res, next) {
    var user = auth.getUser(req.cookies.token)
    try {
        var apoioKmRep = await axios.get('http://api:7779/apoioKm/' + req.params.idApoioKm)
        var apoioKm = apoioKmRep.data
        var nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
        res.render('editarApoioKm', {apoioKm: apoioKm, nivelAcesso: nivelAcesso, user:user})
    } catch (erro) {
        res.render('error', {error: erro, message: "Erro!", user:user})
    }
})

router.post('/editar', auth.verificaAcessoDiretor, async function(req,res,next) {
    var user = auth.getUser(req.cookies.token)
    try {
        var apoioKmRep = await axios.get('http://api:7779/apoioKm/' + req.body._id)
        var apoioKm = apoioKmRep.data

        var receitaEventoRep = await axios.get('http://api:7779/receitaEvento?apoio=' + req.body._id)
        var receitaEvento = receitaEventoRep.data

        if ((apoioKm.distancia != req.body.distancia || apoioKm.atletas != req.body.atletas) && (receitaEvento.length == 1)) {
            console.log(getValorApoio(req.body.atletas, req.body.distancia))
            var receita = {
                codEvento : req.body.codEvento,
                codApoio: req.body._id,
                userID: req.body.userID,
                valor: getValorApoio(req.body.atletas, req.body.distancia)
            }
            await axios.put('http://api:7779/receitaEvento/' + receitaEvento[0]._id, receita)
        }

        await axios.put('http://api:7779/apoioKm/' + req.body._id, req.body)
        res.redirect('/apoioKm/' + req.body._id)
    } catch (erro) {
        res.render('error', {error: erro, message: "Erro!", user:user})
    }
})
module.exports = router
