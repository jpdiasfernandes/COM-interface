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

router.post('/', auth.verificaAcessoSocioOuDiretor, function(req, res, next) {
    axios.post('http://localhost:7779/inscrito', req.body)
        .then(resp =>{
            var nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
            res.redirect('/evento/' + req.body.codEvento)
        })
        .catch( erro => {
            res.render('error', {error: erro, message: "Erro!"})
        })
})

router.get('/remover', auth.verificaAcessoSocioOuDiretor, function(req, res, next) {
   if (req.query.evento && req.query.socio) {
        axios.delete('http://localhost:7779/inscrito?evento=' + req.query.evento + '&socio=' + req.query.socio)
            .then(resp =>{
                res.redirect('/evento/' + req.query.evento)
            })
            .catch( erro => {
                res.render('error', {error: erro, message: "Erro!"})
            })
   } else {
       res.render('error', {error: erro, message: "Erro!"})
   }
})

module.exports = router
