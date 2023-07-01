/*
    Módulo evento.js

    descrição: rotas associadas aos eventos do sistema
    Estas rotas envolvem:
        - listagem dos eventos (tanto sócios como diretores)
        - registo de um evento (para diretores);
        - edição de um evento (para diretores);
 */
var express = require('express');
var router = express.Router();
var axios = require('axios')
var auth = require('../helpers/auth')
var users = require('../helpers/users')
/*
    descrição: renderiza a página de eventos. Esta página contém:
        - formulário para adição de um novo evento; (apenas diretores)
        - listagem de todos os eventos. (tanto sócios como diretores)
 */
router.get('/', auth.verificaAcessoSocioOuDiretor, function(req, res, next) {
    axios.get('http://localhost:7779/evento')
        .then(resp =>{
            eventos = resp.data
            nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
            if (nivelAcesso == "diretor") {
                res.render('eventosDiretoria',{eventos:eventos,nivelAcesso:nivelAcesso})
            } else if (nivelAcesso == "socio") {
                res.render('eventosSocio',{eventos:eventos,nivelAcesso:nivelAcesso})
            }
        })
        .catch( erro => {
            res.render('error', {error: erro, message: "Erro!"})
        })
})



router.get('/:idEvento', auth.verificaAcessoSocioOuDiretor, async function(req, res, next) {
    try {
        var eventoResp = await axios.get('http://localhost:7779/evento/' + req.params.idEvento)
        var evento = eventoResp.data

        var incritosRep = await axios.get('http://localhost:7779/inscrito?evento=' + req.params.idEvento)
        var inscritos = incritosRep.data

        //for (const inscrito of inscritos) {
        //    // Pode ser otimizado se se fizesse um get de todos os users de uma vez
        //    var userRep = await axios.get('http://localhost:7780/user/socio/' + inscrito.userID)
        //    var user = userRep.data
        //    users.set(user._id, user)
        //}


        nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
        if (nivelAcesso == "diretor") {
            var transportesRep = await axios.get('http://localhost:7779/transporte?evento=' + req.params.idEvento)
            var transportes = transportesRep.data

            var apoiosRep = await axios.get('http://localhost:7779/apoioKm?evento=' + req.params.idEvento)
            var apoios = apoiosRep.data


            var usersMap = await users.mapSocioUser([inscritos, transportes, apoios])
            console.log(transportes)
            console.log(usersMap)
            //var apoioUsersMap = new Map()

            //for (const apoio of apoios) {
            //    var socioRep = await axios.get('http://localhost:7780/user/socio/' + apoio.userID)
            //    var socio = socioRep.data
            //    apoioUsersMap.set(apoio.userID, socio)
            //}

            res.render('eventoDiretoria',{evento:evento,nivelAcesso:nivelAcesso, inscritos: inscritos, transportes: transportes, apoios: apoios, usersMap : usersMap})
        } else if (nivelAcesso == "socio") {
            const myId = auth.getID(req.cookies.token)
            const myUserRep = await axios.get('http://localhost:7780/user/' + myId)
            const myUser = myUserRep.data

            var usersMap = await users.mapSocioUser([inscritos])
            res.render('eventoSocio',{evento:evento,nivelAcesso:nivelAcesso, inscritos: inscritos, myUser:myUser, usersMap: usersMap})
        }
    } catch (error) {
        res.render('error', {error: error, message: "Erro!"})
    }
})

router.post('/', auth.verificaAcessoDiretor, async function(req, res, next) {
    try {
        var evento = req.body
        var eventoResp = await axios.post('http://localhost:7779/evento', evento)
        var evento = eventoResp.data
        res.redirect('/evento')
    } catch (error) {
        res.render('error', {error: error, message: "Erro!"})
    }
})

module.exports = router
