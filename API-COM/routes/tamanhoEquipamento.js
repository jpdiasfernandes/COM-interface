var express = require('express');
var router = express.Router();
var TamanhoEquipamento = require('../controllers/tamanhoEquipamento')

router.get('/', function(req, res, next) {
  TamanhoEquipamento.getTamanhoEquipamentos()
    .then(dados => {
      console.log(dados)
      res.status(200).json(dados)
    })
    .catch(erro => {
      res.status(520).json({erro:erro,mensagem:"Erro na listagem dos tamanhos dos equipamentos"})
    })
})


module.exports = router;