/*
  Módulo socios.js
*/

var express = require('express');
var router = express.Router();
var axios = require('axios')
var auth = require('../helpers/auth')

/*
  descrição: renderiza a página de sócios. Esta página contém:
    - Formulário para adição de um novo sócio
    - Listagem de todos os sócios, com a opção de edição
    do nível de credencial de um sócio.
*/
router.get('/', auth.verificaAcessoDiretor, function(req, res, next) {
    axios.get('http://localhost:7780/user/')
    .then(resp =>{
        socios = resp.data
        nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
        res.render('socios',{socios:socios,nivelAcesso:nivelAcesso})
    })
    .catch( erro => {
        res.render('error', {error: erro, message: "Erro!"})
    })
})

/*
  descrição: realiza o registo de um utilizador. Os dados do utilizador
  são enviados através do req.body
*/
router.post('/adicionar', auth.verificaAcessoDiretor, function(req, res, next) {
  axios.post('http://localhost:7780/user/registo',req.body)
    .then(resp =>{
      nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
      res.status(200).render('feedbackServidor',{texto:"Utilizador adicionado com sucesso",voltarUrl:"/socios",nivelAcesso:nivelAcesso})
    })
    .catch(erro =>{
      if (erro.response.status == 520){
        nivelAcesso = auth.getNivelDeAcesso(req.cookies.token)
        res.status(520).render('feedbackServidor',{texto:erro.response.data.message,voltarUrl:"/socios",nivelAcesso:nivelAcesso})
      }else{
        res.render('error', {error: erro, message: erro})
      }
    })
})

module.exports = router;