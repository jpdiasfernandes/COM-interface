/*
  Módulo autenticação.js
  
  descrição: rotas associadas ao processo de login/logout do utilizador.
  O processo de "login" pode ser realizado por qualquer utilizador e,
  ao ser invocado o servidor de autenticação, o "token" enviado pelo 
  servidor de autenticação será colocado na resposta (res) ao utilizador. 
  Deste modo, as futuras requisições deste utilizador logado terão no 
  cookie o token. 
  O processo de logout se baseia na limpagem do cookie "token" assim como
  a desativação do status do utilizador através do servidor de autenticação.
*/

var express = require('express')
var router = express.Router()
var axios = require('axios')
var auth = require('../helpers/auth')

var token_blackList = []

/*
  descrição: renderiza a página de login do utilizador
*/
router.get('/login', function(req, res, next) {
    res.render('login',{nivelAcesso:"none",user:null})
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
        res.status(401).render('feedbackServidor',{texto:"Credenciais inválidas",voltarUrl:"/autenticacao/login", user:null})
      }else{
        res.render('error', {error: erro, message: erro, user:null})
      }
    })
})

/*
  descrição: realiza o logout de um utilizador. O logout corresponde
  a inserção do token numa "blacklist"
*/
router.get('/logout', function(req, res, next) {
  global.token_blackList.push(req.cookies.token)
  res.render('login',{user:null})
})

module.exports = router;