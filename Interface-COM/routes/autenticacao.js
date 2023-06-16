/*
  Módulo autenticação.js
  
  descrição: rotas associadas ao processo de login/logout do utilizador.
  O processo de "login" pode ser realizado por qualquer utilizador e,
  ao ser invocado o servidor de autenticação, o "token" enviado pelo 
  servidor de autenticação será colocado na resposta (res) ao utilizador. 
  Deste modo, as futuras requisições deste utilizador logado terão no 
  cookie o token. 
*/

var express = require('express')
var router = express.Router()
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
      res.cookie('token',resp.data.token).redirect('/home')
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
  descrição: realiza o logout de um utilizador. O logout corresponde
  a desativação do status do utilizador no authserver e na limpagem
  do cookie <token>
*/
router.get('/logout', function(req, res, next) {
  userID = auth.getID(req.cookies.token)
  axios.put('http://localhost:7780/user/'+userID+'/desativar')
    .then(resp =>{
      res.cookie('token','').redirect('/autenticacao/login')
    })
    .catch(erro =>{
        res.render('error', {error: erro, message: erro})
    })
})

module.exports = router;