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

/*
  descrição: realiza o login de um utilizador. O username
  e a password são enviadas através do req.body
*/
router.post('/login', function(req, res, next) {
  axios.post('http://localhost:7780/user/login',req.body)
    .then(resp =>{
      res.cookie('token',resp.data.token).status(200).render('home')
    })
    .catch(erro =>{
      if (erro.response.status == 401){
        res.status(401).render('feedbackServidor',{texto:"Credenciais inválidas",voltarUrl:"/autenticacao/login"})
      }else{
        res.render('error', {error: erro, message: erro})
      }
    })
})

/*
  descrição: renderiza a página de registo de utilizador
  TODO: add verificaAcessoDiretor middleware
*/
router.get('/registo', function(req, res, next) {
    res.render('registo')
})

/*
  descrição: realiza o registo de um utilizador. Os dados do utilizador
  são enviados através do req.body
  TODO: add verificaAcessoDiretor middleware
*/
router.post('/registo',function(req, res, next) {
  axios.post('http://localhost:7780/user/registo',req.body)
    .then(resp =>{
      res.status(200).render('feedbackServidor',{texto:"Utilizador adicionado com sucesso",voltarUrl:"/autenticacao/registo"})
    })
    .catch(erro =>{
      if (erro.response.status == 520){
        res.status(520).render('feedbackServidor',{texto:erro.response.data.message,voltarUrl:"/autenticacao/registo"})
      }else{
        res.render('error', {error: erro, message: erro})
      }
    })
})

module.exports = router;