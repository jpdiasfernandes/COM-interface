/*
  Módulo home.js
*/

var express = require('express');
var router = express.Router();
var auth = require('../helpers/auth')

/*
  descrição: renderiza a página home da aplicação
*/
router.get('/', auth.verificaAcessoSocioOuDiretor, function(req, res, next) {
    let user = auth.getUser(req.cookies.token)
    res.render('home', {user:user})
})

module.exports = router