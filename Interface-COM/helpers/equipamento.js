module.exports.filtroEquipamentos = (equipamentos,filtros) => {

    equipamentosFiltrados = []
    
    for (var equipamento of equipamentos){
        var satis = true

        if (filtros.nome != ''){
            if (equipamento.nome == filtros.nome){
                satis = true
            }else{
                satis = false
            }
        }

        if (filtros.tipo != '' && satis == true){
            if (equipamento.tipo == filtros.tipo){
                satis = true
            }else{
                satis = false
            }
        }

        if (filtros.custo != '' && satis == true){
            console.log(filtros,equipamento)
            if (filtros.custoLimite == "Maior"){
                if (equipamento.custo > filtros.custo){
                    satis = true
                }else{
                    satis = false
                }
            }else{
                if (equipamento.custo < filtros.custo){
                    satis = true
                }else{
                    satis = false
                }
            }
        }

        if (satis == true){
            equipamentosFiltrados.push(equipamento)
        }
    }
    
    return equipamentosFiltrados
}

module.exports.ordenacaoEquipamentos = (equipamentos,ordenacao) => {
    console.log(ordenacao)
    if (ordenacao.campo == "custo"){
        if (ordenacao.ordem == "asc"){
            return equipamentos.sort((a, b) => a.custo - b.custo)
        }else{
            return equipamentos.sort((a, b) => b.custo - a.custo)
        }
    }else if (ordenacao.campo == "nome"){
        if (ordenacao.ordem == "asc"){
            return equipamentos.sort((a, b) => a.nome.localeCompare(b.nome))
        }else{
            return equipamentos.sort((a, b) => b.nome.localeCompare(a.nome))
        }
    }
    
}