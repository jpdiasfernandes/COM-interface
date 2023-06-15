/*
  Módulo autenticação.js
  
  descrição: rotas associadas ao processo de login e registo dos utilizador.
  No caso do registo, apenas utilizadores com acesso de "diretor" podem realizar
  tal operação. O processo de "login" pode ser realizado por qualquer utilizador e,
  ao ser invocado o servidor de autenticação, o "token" enviado pelo servidor de autenticação
  será colocado na resposta (res) ao utilizador. Deste modo, as futuras requisições deste utilizador
  logado terão no cookie o token. 
*/

var express = require('express');
var router = express.Router();
var axios = require('axios')
var auth = require('../helpers/auth')

/*
  descrição: renderiza a página de login do utilizador
*/
router.get('/login', function(req, res, next) {
    res.render('login')
})

router.post('/login', function(req, res, next) {
  axios.post('/autenticacao/login')
    .then(token =>{
      res.cookie('token',token).status(200).render('homepage')
    })
    .catch(erro =>{
      res.render('error', {error: erro, message: "Erro!"})
    })
})

/*
  descrição: renderiza a página de registo de utilizador
  TODO: add verificaAcessoDiretor middleware
*/
router.get('/registo', function(req, res, next) {
    res.render('registo')
})

router.post('/registo',function(req, res, next) {
  axios.post('http://localhost:7780/user/registo',req.body)
    .then(resp =>{
      res.status(200).render('TODO')
    })
    .catch(erro =>{
      res.render('error', {error: erro, message: "Erro!"})
    })
})

module.exports = router;