/*
  descrição: verifica se a requisição é proveniente de um utilizador com credencial de "diretor".
  Para este efeito, será utilizado o token proveniente ou da query, ou do body, ou dos cookies da requisição.
  Caso for sócio, next() será invocado, caso contrário, é enviada uma resposta com código 401 ao utilizador.
*/
function verificaAcessoDiretor(req, res, next){
    var token = req.query.token || req.body.token || req.cookies.token 
    if(token){
        jwt.verify(token, "com", function(e, payload){
        if(e){
            res.status(401).jsonp({error: e})
        }
        else{
            if (payload.level == "Diretor"){
                next()
            }else{
                res.status(401).jsonp({error: "Apenas utilizadores com credencial de diretor podem acessar esta página"})
            }
        }
        })
    }
    else{
        res.status(401).jsonp({error: "Token inexistente!"})
    }
}

/*
  descrição: verifica se a requisição é proveniente de um utilizador com credencial de "sócio".
  Para este efeito, será utilizado o token proveniente ou da query, ou do body, ou dos cookies da requisição.
  Caso for sócio, next() será invocado, caso contrário, é enviada uma resposta com código 401 ao utilizador.
*/
function verificaAcessoSocio(req, res, next){
    var token = req.query.token || req.body.token || req.cookies.token 
    if(token){
        jwt.verify(token, "com", function(e, payload){
        if(e){
            res.status(401).jsonp({error: e})
        }
        else{
            if (payload.level == "Socio"){
                next()
            }else{
                res.status(401).jsonp({error: "Apenas utilizadores com credencial de socio podem acessar esta página"})
            }
        }
        })
    }
    else{
        res.status(401).jsonp({error: "Token inexistente!"})
    }
}

module.exports = {
    verificaAcessoDiretor,
    verificaAcessoSocio
}