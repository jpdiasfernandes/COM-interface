<h1 style="font-size:60px" align="center"><img height=28cm src="images/logo.png"> COM</h1>

<h4 align="center">Plataforma de gestão do Clube de Orientação do Minho. A Orientação é um desporto ao ar livre que exercita a mente e o corpo, onde tu defines o teu próprio caminho entre pontos marcados num mapa!</h4>

<br>

<img src="images/banner.png">

<br>

# Sumário

1. [Definição do Domínio](#dominio)
    1.  [Contextualização](#org2ddc0f9)
    2.  [Fundamentação](#org2a1cae2)
    3.  [Objetivos](#org597515c)
2. [Especificação dos Requisitos](#especificacao)
    1.  [Utilizadores](#org15945ad)
        1.  [Funcionais](#org45bfd79)
        2.  [Não funcionais](#org477c1df)
        3.  [Sócio](#org43310ab)
        4.  [Direção](#orgc0b2ede)
    2.  [Sistema](#orgc0bdb1b)
        1.  [Funcionais](#org0e2ccc1)
        2.  [Não funcionais](#org9fd4947)
3. [Modelação do Sistema](#modelacao)
    1. [Arquitetura](#modelacao)
    2. [API COM](#api)
    3. [Auth COM](#auth)
    4. [Interface COM](#interface)

<a id="dominio"></a>

# Definição do Domínio

<a id="org2ddc0f9"></a>

## Contextualização

O .COM - Clube de Orientação do Minho, é uma associação desportiva e recreativa, de fins não lucrativos, sedeada em Braga e cujos objectivos são o desenvolvimento e a promoção da prática da Orientação e de actividades de ar livre, na região do Minho. Fundado em 12 de dezembro de 2002, por antigos membros da ARCCa - Associação Recreativa e Cultural do Campo.

A dimensão do clube é considerada pequena, devido à afluência de desportista do desporto de orientação. O clube conta com cerca de 200 sócios sendo a maioria da região do Distrito de Braga.

<a id="org2a1cae2"></a>

## Fundamentação

Nos últimos anos o clube tem sentido algumas dificuldades na gestão de informação interna e na informação que disponibiliza aos sócios. As folhas de cálculo que têm que ser renovadas ano após ano funcionam, mas não oferecem muita flexibilidade para o futuro e todos os anos a criação de uma nova folha pode levar a erros que poodem levar a erros financeiros que podem levar ao fim do clube.

A sensação de um utilizador interno desta ferramenta é que não sente segurança ao usar estas folhas porque não existe muita documentação nem uma interface de fácil gestão dos dados. Assim sendo, tem medo de alterar informação ou danificar dados ao aceder de forma direta aos dados da folha de cálculo.

Para terminar com a necessidade da criação de novas folhas de forma anual o clube decidiu implementar uma base de dados e uma interface gráfica que possibilite a gestão da informação pela direção do clube (gestão interna) e o acesso de informação relevante aos sócios, como dívidas do sócio.

<a id="org597515c"></a>

## Objetivos

-   Melhorar capacidade de gestão interna
-   Gestão indireta da base de dados através de uma interface gráfica
-   Ter um histórico dos gastos do clube e receitas superior a um ano
-   Melhorar a disponibilização de informação ao sócio

<a id="especificacao"></a>

# Especificação dos Requisitos

<a id="org15945ad"></a>

## Utilizadores

<a id="org45bfd79"></a>

### Funcionais

-   O utilizador tem de se autenticar na plataforma para a poder utilizar [MUST]
-   O utilizador pode efetuar logout da aplicação [MUST]
-   O utilizador edita o seu perfil [MUST]


<a id="org477c1df"></a>

### Não funcionais

-   O utilizador é caracterizado por:
    -   ID (Nº Sócio?)
    -   Nome
    -   Data Nascimento
    -   Idade
    -   Sexo
    -   BI/CC
    -   Nº FPO
    -   e-mail
    -   telemóvel
    -   Telefone fixo
    -   Morada
    -   Data de admissão
    -   Observações
    -   Se é ativo

<a id="org43310ab"></a>

### Sócio

1.  Funcionais

    -   O sócio pode consultar um histórico de despesas e receitas [MUST]
    -   O sócio pode filtrar despesas por categoria. (Equipamentos, Transportes, Inscrições, Outro, Cotas) [MUST]
    -   O sócio pode filtrar receitas por categoria (Apoio ao Km, outro) [MUST]
    -   O sócio deve poder consultar um sumário do balanço despesas/receitas [MUST]
    
    -   O sócio deve poder requisitar equipamentos. [MUST]
    
    -   Ao requisitar um equipamento devem saber se o equipamento está disponível e o preço do equipamento [MUST]
    
    -   O sócio deve poder ter opção de pagar as dívidas. [OPTIONAL]
    
    -   O sócio deve poder aceder a uma página que lista as últimas notificações/comunicados do clube [OPTINAL]


<a id="orgc0b2ede"></a>

### Direção

-   Um membro da direção deve poder aceder a uma lista de sócios [MUST]

-   Um membro da direção deve poder adicionar comunicados numa página de notificações da plataforma do clube [OPTIONAL]

1.  Equipamentos

    1.  Funcionais
    
        -   Um membro da direção deve poder gerir stock de equipamentos. Deve poder adicionar novos equipamentos. [MUST]
        -   Deve ser possível criar uma nova categoria de equipamento [OPTIONAL]
        -   Um membro da direção deve poder ver uma lista de pedidos de requisição de equipamentos por entregar [MUST]
        
        -   Um membro da direção deve poder alterar o estado de um pedido de requisição de equipamento. [MUST]
    
    2.  Não funcionais
    
        -   Um equipamento é caracterizado por:
            -   Cod Equipamento (número único que represente um lote de encomenda)
            -   Mapeamento entre tamanho e stock disponível
            -   Tipo de equipamento (Tshirt, Tshirt cavas, Polo, Sweat, Casaco, Calças, Corçarios)
            -   Custo equipamento
            -   Percentagem de desconto
        
        -   O estado de um pedido de requisição de equipamento deve ser:
            -   Não entregue, entregue (e pago [OPTIONAL])

2.  Eventos

    1.  Funcionais
    
        -   Um membro da direção deve poder adicionar eventos. [MUST]
        -   Um membro da direção deve poder adicionar sócios a eventos criados. [MUST]
        -   Um membro da direção deve poder associar despesas de inscrição que o sócio tem que pagar a um evento. [MUST]
        -   Um membro da direção deve poder associar um sócio que levou o seu carro a um evento. Sendo que o sistema deve calcular o valor que o clube deve ao sócio pelo apoio ao km. [MUST]
        -   Um membro da direção deve poder associar um sócio a um veículo no qual o sócio está alocado [OPTIONAL]
        -   Um membro da direção deve poder associar um ponto de encontro e uma hora de saída a um veículo [OPTIONAL]
    
    2.  Não funcionais
    
        -   Um evento é caracterizado por:
            -   Nome de evento
            -   Localização
            -   Intervalo de data de realização (Data início e data fim)
            -   Lista de sócios inscritos/confirmados num evento
            -   Tipo (Participação ou organização)
            -   Associações entre sócios inscritos e depesas/receitas do sócio.
                -   As despesas são divididas em Transporte e inscrições
                -   As receitas são equivalentes ao apoio ao km que o clube deve ao sócio
            -   Associações entre sócios e em que veículos vão [OPTIONAL]
            -   Informação sobre o ponto de encontro e hora de encontro de cada veículo para sair [OPTIONAL]

3.  Comunicados/Notificações [OPTIONAL]

    1.  Funcionais
    
        -   Um membro da direção deve poder adicionar comunicados/notificações sobre informações ache pertinente [OPTIONAL]
    
    2.  Não funcionais
    
        -   Um comunicado é caracterizado por uma mensagem, data de emissão [OPTIONAL]

4.  Contabilidade

    1.  Funcionais
    
        -   Deve poder criar novas categorias de gestão financeira. [MUST]
            -   Preparação (divulgação, prémios )
            -   Meios técnicos e materiais (material informático, mapas orientação, material orientação)
            -   Estrutura (alimentação, água, eletrecidade)
            -   Logística (Alimentação, alojamento, transporte, inscrições provas, equipamentos de competição)
        -   Deve poder adicionar uma entrada de receita [MUST]
        -   Deve poder adicionar uma entrada de despesa [MUST]
    
    2.  Não funcionais
    
        -   As categorias de gestão financeira são caracterizadas por:
            -   Código
            -   Nome Categoria
            -   Descrição
            -   Subcategoria (Uma subcategoria é uma categoria)
        -   Uma receita é caracterizada por:
            -   Ordem (código da receita)
            -   Nome da receita
            -   Atividade (Evento associado à receita, opcional)
            -   Nº sócio (opcional pode ser uma receita externa)
            -   Responsável (quem pagou)
            -   Valor pago
            -   Data
            -   Categoria de receita
        
        ? Como fazer a apoios relativos a mais de um evento? Por exemplo anuais?
        
        -   Uma despesa é caracterizada por:
            -   Ordem (código da despesa)
            -   Natureza da Despesa
            -   Evento (opcional)
            -   Nome da despesa
            -   NIF Fornecedor
            -   Nome do Fornecedor
            -   Nº Doc. Fornecedor
            -   Data da despesa
            -   Valor total do Doc.
            -   Código de despesa
            -   Valor Real a Pagar (Qual a diferença para o Valor total do documento?)
            -   Responsável (A quem se tem que pagar)
            -   Nº sócio (Se a pessoa for interna)
            -   Forma de pagamento
            -   Estado (Por pagar ou pago)
            -   Quem lançou
            -   Data de Lançamento


<a id="orgc0bdb1b"></a>

## Sistema


<a id="org0e2ccc1"></a>

### Funcionais

-   O sistema deve calcular o preço de um equipamento com base se o utilizador tem direito a desconto ou não. Um sócio tem desconto num determinado artigo se a sua última requisição de um determinado tipo de artigo foi há mais de dois anos. [MUST]

-   O sistema deve requisitar o valor anual das cotas aos sócios ativos [MUST]

-   O sistema deve requisitar o valor da jóia a novos sócios do clube. [MUST]


<a id="org9fd4947"></a>

### Não funcionais

-   O sistema deve ter uma interface gráfica na web [MUST]
-   O sistema deve ter autenticação por tokens [MUST]

<a id="modelacao"></a>

# Modelação do Sistema

<a id="arquitetura"></a>

## Arquitetura

<a id="api"></a>

## API COM

A API de dados do sistema COM possui as operações CRUD associadas aos  verbos HTTP sobre os seguintes dados:

<ul style="list-style: none;">
    <li>
        <h2><b>/equipamento</b></h2>
        <ul>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                    <div style="margin-left:5px;text-align:center">/equipamento?query</div>
                </div>
                <p><b>Descrição</b>: lista os equipamentos do sistema (podem ser usados filtros na <i>query string</i>).</p>
                <p><b>Query String</b>: 
                <ul>
                    <li>
                        tipo;
                    </li>
                    <li>
                        nome;
                    </li>
                    <li>
                        gt (greater then) & value;
                    </li>
                    <li>
                        lt (greater then) & value;
                    </li>
                    <li>
                        sort & order (ordena segundo custo ou ordem alfabética dos nomes dos equipamentos).
                    </li>
                </ul>
                </p>
                </li>
                <p><b>Exemplo</b>: /equipamento?tipo=Mochila&sort=custo&order=asc
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                    <div style="margin-left:5px;text-align:center">/equipamento/:idEquipamento</div>
                </div>
                <p><b>Descrição</b>: Recupera o equipamento com id indicado na URL<idEquipamento>.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
                    <div style="margin-left:5px;text-align:center">/equipamento</div>
                </div>
                <p><b>Descrição</b>: Cria um equipamento com os dados enviados através do <i>req.body</i>.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:red;padding:3px;width:60px;text-align:center"><b>DELETE</b></h4>
                    <div style="margin-left:5px;text-align:center">/equipamento/:idEquipamento</div>
                </div>
                <p><b>Descrição</b>: Remove o equipamento com o id indicado na URL.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:orange;padding:3px;width:60px;text-align:center"><b>PUT</b></h4>
                    <div style="margin-left:5px;text-align:center">/equipamento/:idEquipamento</div>
                </div>
                <p><b>Descrição</b>: Atualiza o equipamento com id enviado na URL e os dados enviados através do <i>req.body</i>.</p>
            </li>
        </ul>
    </li>
    <li>
        <h2><b>/dividaEquipamento</b></h2>
        <ul>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                    <div style="margin-left:5px;text-align:center">/dividaEquipamento?query</div>
                </div>
                <p><b>Descrição</b>: lista as requisições de equipamentos do sistema (podem ser usados filtros na <i>query string</i>).</p>
                <p><b>Query String</b>: 
                <ul>
                    <li>
                        codEquipamento;
                    </li>
                    <li>
                        userID;
                    </li>
                    <li>
                        estado (entregue, não entregue ou pago).
                    </li>
                </ul>
                </p>
                </li>
                <p><b>Exemplo</b>: /dividaEquipamento?codEquipamento=183081&estado=entregue
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                    <div style="margin-left:5px;text-align:center">/dividaEquipamento/:idDividaEquipamento</div>
                </div>
                <p><b>Descrição</b>: Recupera a requisição do equipamento com o id indicado na URL.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
                    <div style="margin-left:5px;text-align:center">/dividaEquipamento</div>
                </div>
                <p><b>Descrição</b>: Cria a requisição de um equipamento com os dados enviados através do <i>req.body</i>.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:red;padding:3px;width:60px;text-align:center"><b>DELETE</b></h4>
                    <div style="margin-left:5px;text-align:center">/dividaEquipamento/:idDividaEquipamento</div>
                </div>
                <p><b>Descrição</b>: Remove a requisição do equipamento com o id indicado na URL.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:orange;padding:3px;width:60px;text-align:center"><b>PUT</b></h4>
                    <div style="margin-left:5px;text-align:center">/dividaEquipamento/:idDividaEquipamento</div>
                </div>
                <p><b>Descrição</b>: atualiza a requisição do equipamento com id indicado na URL</p>
            </li>
        </ul>
    </li>
    <li>
        <h2><b>/notificacao</b></h2>
        <ul>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                    <div style="margin-left:5px;text-align:center">/notificacao?query</div>
                </div>
                <p><b>Descrição</b>: lista as notificações do sistema (podem ser usados filtros na <i>query string</i>).</p>
                <p><b>Query String</b>: 
                <ul>
                    <li>
                        sort & order (ordena as notificações segundo a data de criação) 
                    </li>
                </ul>
                </p>
                </li>
                <p><b>Exemplo</b>: /notificacao?sort=data&order=desc
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                    <div style="margin-left:5px;text-align:center">/notificacao/:idNotificacao</div>
                </div>
                <p><b>Descrição</b>: Recupera a notificacao com o id indicado na URL.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
                    <div style="margin-left:5px;text-align:center">/notificacao</div>
                </div>
                <p><b>Descrição</b>: Cria a notificação com os dados enviados através do <i>req.body</i>.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:red;padding:3px;width:60px;text-align:center"><b>DELETE</b></h4>
                    <div style="margin-left:5px;text-align:center">/notificação/:idNotificação</div>
                </div>
                <p><b>Descrição</b>: Remove a notificação com o id indicado na URL.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:orange;padding:3px;width:60px;text-align:center"><b>PUT</b></h4>
                    <div style="margin-left:5px;text-align:center">/notificacao/:idNotificacao</div>
                </div>
                <p><b>Descrição</b>: atualiza a notificação com id indicado na URL</p>
            </li>
        </ul>
    </li>
    <li>
        <h2><b>/apoioKM</b></h2>
        <ul>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                    <div style="margin-left:5px;text-align:center">/apoioKM?query</div>
                </div>
                <p><b>Descrição</b>: lista os apoios ao KM do sistema (podem ser usados filtros na <i>query string</i>).</p>
                <p><b>Query String</b>: 
                <ul>
                    <li>
                        evento (retorna os apoios ao KM associados ao evento)
                    </li>
                </ul>
                </p>
                </li>
                <p><b>Exemplo</b>: /apoioKM?evento=11100009
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                    <div style="margin-left:5px;text-align:center">/apoioKM/:idApoio</div>
                </div>
                <p><b>Descrição</b>: Recupera o apoio ao KM com o id indicado na URL.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
                    <div style="margin-left:5px;text-align:center">/apoioKM</div>
                </div>
                <p><b>Descrição</b>: Cria o apoio ao KM com os dados enviados através do <i>req.body</i>.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:red;padding:3px;width:60px;text-align:center"><b>DELETE</b></h4>
                    <div style="margin-left:5px;text-align:center">/apoioKM/:idApoio</div>
                </div>
                <p><b>Descrição</b>: Remove o apoio ao KM com o id indicado na URL.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:orange;padding:3px;width:60px;text-align:center"><b>PUT</b></h4>
                    <div style="margin-left:5px;text-align:center">/apoioKM/:idApoio</div>
                </div>
                <p><b>Descrição</b>: atualiza o apoio ao KM com id indicado na URL.</p>
            </li>
        </ul>
    </li>
    <li>
        <h2><b>/tamanhoEquipamento</b></h2>
            <ul>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                    <div style="margin-left:5px;text-align:center">/apoioKM/:idApoio</div>
                </div>
                <p><b>Descrição</b>: lista os tamanhos dos equipamentos do sistema.</p>
            </li>
        </ul>
    </li>
    <li>
        <h2><b>/transporte</b></h2>
        <ul>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                    <div style="margin-left:5px;text-align:center">/transporte?query</div>
                </div>
                <p><b>Descrição</b>: lista os transportes do sistema (podem ser usados filtros na <i>query string</i>).</p>
                <p><b>Query String</b>: 
                <ul>
                    <li>
                        evento (retorna os transportes associados ao evento).
                    </li>
                </ul>
                </p>
                </li>
                <p><b>Exemplo</b>: /transporte?evento=11100009
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                    <div style="margin-left:5px;text-align:center">/transporte/:idTransporte</div>
                </div>
                <p><b>Descrição</b>: Recupera o transporte com o id indicado na URL.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
                    <div style="margin-left:5px;text-align:center">/transporte</div>
                </div>
                <p><b>Descrição</b>: Cria o transporte com os dados enviados através do <i>req.body</i>.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:red;padding:3px;width:60px;text-align:center"><b>DELETE</b></h4>
                    <div style="margin-left:5px;text-align:center">/transporte/:idTransporte</div>
                </div>
                <p><b>Descrição</b>: Remove o transporte com o id indicado na URL.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:orange;padding:3px;width:60px;text-align:center"><b>PUT</b></h4>
                    <div style="margin-left:5px;text-align:center">/transporte/:idTransporte</div>
                </div>
                <p><b>Descrição</b>: atualiza o transporte com id indicado na URL.</p>
            </li>
        </ul>
    </li>
    <li>
        <h2><b>/evento</b></h2>
        <ul>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                    <div style="margin-left:5px;text-align:center">/evento</div>
                </div>
                <p><b>Descrição</b>: lista os eventos do sistema.</p>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                    <div style="margin-left:5px;text-align:center">/evento/:idEvento</div>
                </div>
                <p><b>Descrição</b>: Recupera o evento com o id indicado na URL.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
                    <div style="margin-left:5px;text-align:center">/evento</div>
                </div>
                <p><b>Descrição</b>: Cria o evento com os dados enviados através do <i>req.body</i>.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:red;padding:3px;width:60px;text-align:center"><b>DELETE</b></h4>
                    <div style="margin-left:5px;text-align:center">/evento/:idEvento</div>
                </div>
                <p><b>Descrição</b>: Remove o evento com o id indicado na URL.</p>
            </li>
        </ul>
    </li>
    <li>
        <h2><b>/dividaEvento</b></h2>
        <ul>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                    <div style="margin-left:5px;text-align:center">/evento?query</div>
                </div>
                <p><b>Descrição</b>: lista as dívidas sobre os eventos do sistema.</p>
                <p><b>Query String</b>: 
                <ul>
                </ul>
                </p>
                </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
                    <div style="margin-left:5px;text-align:center">/dividaEvento</div>
                </div>
                <p><b>Descrição</b>: Cria uma dívida de um evento com os dados enviados através do <i>req.body</i>.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:red;padding:3px;width:60px;text-align:center"><b>DELETE</b></h4>
                    <div style="margin-left:5px;text-align:center">/dividaEvento/:idDivida</div>
                </div>
                <p><b>Descrição</b>: Remove a dívida do evento com o id indicado na URL.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:orange;padding:3px;width:60px;text-align:center"><b>PUT</b></h4>
                    <div style="margin-left:5px;text-align:center">/dividaEvento/:idDivida</div>
                </div>
                <p><b>Descrição</b>: atualiza a dívida do evento com id indicado na URL.</p>
            </li>
        </ul>
    </li>
</ul>

<a id="auth"></a>

## Auth COM

O processo de autenticação utilizado foi com JWT (<i>JSON Web Tokens</i>), juntamente com a estratégia de autenticação <b>local</b> da biblioteca <i>passport</i> no contexto do <i>plugin</i> passportLocalMongoose. Isto é, o <i>username</i> e <i>password</i> dos utilizadores são utilizados para a realização do processo de <i>login</i> e, no caso de haver sucesso na verificação destes dados, é gerado um <i>token</i> JWT com tempo de expiração de 1 hora que é enviado ao cliente. A partir deste <i>token</i> as rotas da aplicação cliente são protegidas.

A interface COM, ao receber o <i>token</i> do servidor de autenticação, envia este ao cliente através dos <i>cookies</i>. A partir daí, os pedidos do cliente sempre carregam este <i>token</i> através dos <i>cookies</i> que é verificado no <i>middleware</i> das rotas da interface COM. Este <i>middleware</i> tem como função proteger as rotas segundo o nível de acesso dos utilizadores. Deste modo, existem três  protegeções de rotas:

<ul>
<li> rotas destinadas somente a diretores;
<li> rotas destinadas somente a sócios;
<li> rotas destinadas tanto a sócios como diretores;
</ul>

O <i>payload</i> do <i>token</i> JWT possui o nível de credencial do utilizador. Por tanto, caso o tempo de expiração seja validado juntamente com o nível de acesso do utilizador, então a rota destinado é acessada. Caso contrário, o utilizador não tem permissão para acessá-la.

Para além do tempo de expiração do <i>token</i>, existe também a possibilidade do utilizador forçar o <i>logout</i> na aplicação. Neste cenário, o seu <i>token</i> é colocado numa <i>blacklist</i> e, por tanto, tal lista é utilizada também no <i>middleware</i> de proteção das rotas.

O servidor de autenticação possui as operações relativas ao processo de criação, autenticação e atualização dos dados dos utilizadores. A seguir são listados os seus <i>endpoints</i>:

<ul style="list-style: none;">
    <li>
        <h2><b>/user</b></h2>
        <ul>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                    <div style="margin-left:5px;text-align:center">/user</div>
                </div>
                <p><b>Descrição</b>: lista os utilizadores do sistema (tanto sócios como diretores)</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                    <div style="margin-left:5px;text-align:center">/user/:id</div>
                </div>
                <p><b>Descrição</b>: recupera o utilizador com id indicado na URL.</p>
            </li>
             <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
                    <div style="margin-left:5px;text-align:center">/user/registo</div>
                </div>
                <p><b>Descrição</b>: cria o utilizador com os dados enviados através do <i>req.body</i>.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
                    <div style="margin-left:5px;text-align:center">/user/login</div>
                </div>
                <p><b>Descrição</b>: realiza o <i>login</i> do utilizador. Este processo consiste na verificação do <i>username</i> e <i>password</i> que são enviados através do <i>req.body</i> e, no caso de sucesso, é gerado um token JWT que é enviado ao cliente. Este <i>token</i> possui o <i>username</i>, nível de acesso e <i>id</i> do utilizador.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:orange;padding:3px;width:60px;text-align:center"><b>PUT</b></h4>
                    <div style="margin-left:5px;text-align:center">/user/:id</div>
                </div>
                <p><b>Descrição</b>: atualiza o utilizador com id indicado na URL e dados enviados através do <i>req.body</i>.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:red;padding:3px;width:60px;text-align:center"><b>DELETE</b></h4>
                    <div style="margin-left:5px;text-align:center">/user/:id</div>
                </div>
                <p><b>Descrição</b>: remove o utilizador com id indicado na URL.</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:orange;padding:3px;width:60px;text-align:center"><b>PUT</b></h4>
                    <div style="margin-left:5px;text-align:center">/user/:id/ativar</div>
                </div>
                <p><b>Descrição</b>: atualiza o <i>status</i> do utilizador indicado na URL para "ativo".</p>
            </li>
            <li>
                <div style="display:flex;text-align:center">
                    <h4 style="background-color:orange;padding:3px;width:60px;text-align:center"><b>PUT</b></h4>
                    <div style="margin-left:5px;text-align:center">/user/:id/desativar</div>
                </div>
                <p><b>descrição</b>: atualiza o <i>status</i> do utilizador indicado na URL para "desativado".</p>
            </li>
        </ul>
    </li>
</ul>

<a id="Interface COM"></a>

## Interface COM

A interface gráfica possui funcionalidades e renderização de páginas mediante o nível (sócio ou diretor) do utilizador. A seguir são listadas as rotas e páginas da aplicação segundo as vistas dos utilizadores.

### Sócios

<ul>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
            <div style="margin-left:5px;text-align:center">/equipamento</div>
            <br>
        </div>
        <p><b>Descrição</b>: renderiza a página de equipamentos na vista do sócio. Esta vista apresenta os equipamentos com a opção de requisitá-los.</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
            <div style="margin-left:5px;text-align:center">/equipamento/requisitar/:idEquipamento</div>
        </div>
        <p><b>Descrição</b>: renderiza a página de requisição de um equipamento. Após selecionar o tamanho que pretende, o utilizador pode enfim requisitar o equipamento ou cancelar a operação</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
            <div style="margin-left:5px;text-align:center">/equipamento/requisitar</div>
        </div>
        <p><b>Descrição</b>: requisita um equipamento X de tamanho Y. Os dados são enviados através do <i>req.body</i>.</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
            <div style="margin-left:5px;text-align:center">/equipamento/filtro</div>
        </div>
        <p><b>Descrição</b>: renderiza a página dos equipamentos segundo o filtro selecionado para os equipamentos.</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
            <div style="margin-left:5px;text-align:center">/dividaEquipamento/filtro</div>
        </div>
        <p><b>Descrição</b>: renderiza a página dos equipamentos segundo o filtro selecionado para as dívidas dos equipamentos</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
            <div style="margin-left:5px;text-align:center">/:idEquipamento</div>
        </div>
        <p><b>Descrição</b>: renderiza a página de visualização de um equipamento.</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
            <div style="margin-left:5px;text-align:center">/utilizador/perfil</div>
        </div>
        <p><b>Descrição</b>: renderiza a página do perfil do utilizador. Esta página contém:
        <ul>
        <li>informações do utilizador (com opção para edição de qualquer campo com exceção do nível da credencial);
        <li>listagem das dívidas sobre equipamentos do utilizador;
        <li>listagem das dívidas sobre eventos do utilizador;
        <li>listagem das receitas do utilizador;
        <li>balanço (saldo do utilizador).</p>
        </ul>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
            <div style="margin-left:5px;text-align:center">/utilizador/editar/:idUtilizador</div>
        </div>
        <p><b>Descrição</b>: renderiza a página de edição dos dados do utilizador na vista do sócio (é possível modificar todos os campos exceto o nível de credencial).</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
            <div style="margin-left:5px;text-align:center">/utilizador/editar/:idUtilizador</div>
        </div>
        <p><b>Descrição</b>: realiza a atualização do utilizador após a confirmação do formulário de edição dos seus dados.  Os dados do utilizador
  são enviados através do req.body.</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
            <div style="margin-left:5px;text-align:center">/:idUtilizador</div>
        </div>
        <p><b>Descrição</b>: renderiza a página de visualização dos dados de um utilizador.</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
            <div style="margin-left:5px;text-align:center">/notificacao</div>
        </div>
        <p><b>Descrição</b>: descrição: renderiza a página de notificações (apenas para visualização)</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
            <div style="margin-left:5px;text-align:center">/notificacao/filtro</div>
        </div>
        <p><b>Descrição</b>: renderiza a página de notificações segundo o filtro selecionado para as notificações (o filtro é enviado através do <i>req.body</i>).</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
            <div style="margin-left:5px;text-align:center">/home</div>
        </div>
        <p><b>Descrição</b>: renderiza a página inicial da aplicação. Esta página contém hiperlinks para as páginas dos <b>eventos</b>, <b>equipamentos</b> e <b>notificações</b>.</p>
    </li>
</ul>

### Diretores

<ul>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
            <div style="margin-left:5px;text-align:center">/equipamento/diretoria</div>
            <br>
        </div>
        <p><b>Descrição</b>: renderiza a página de equipamentos na vista da diretoria.
  Esta vista apresenta os equipamentos com as opções de editá-los, criá-los e
  removê-los, assim como a visualização das dívidas de equipamentos dos utilizadores
  que fizeram uma requisição. O diretor ainda pode atualizar o estado destas requisições.</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
            <div style="margin-left:5px;text-align:center">/equipamento/editar/:idEquipamento</div>
        </div>
        <p><b>Descrição</b>: renderiza a página de edição de um equipamento.
  Após modificar os campos que pretende, o diretor pode cancelar a edição
  e voltar a página principal ou atualizar os tais valores que modificou do equipamento.</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
            <div style="margin-left:5px;text-align:center">/equipamento/editar</div>
        </div>
        <p><b>Descrição</b>: atualiza os valores de um equipamento.
  O equipamento é enviado através do <i>req.body</i> (juntamente
  com o seu ID).</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
            <div style="margin-left:5px;text-align:center">/equipamento/adicionar</div>
        </div>
        <p><b>Descrição</b>: renderiza a página de adição de um equipamento.</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
            <div style="margin-left:5px;text-align:center">/equipamento/adicionar</div>
        </div>
        <p><b>Descrição</b>:  adiciona um novo equipamento
  O equipamento é enviado através do <i>req.body</i> .</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
            <div style="margin-left:5px;text-align:center">/equipamento/remover/:idEquipamento</div>
        </div>
        <p><b>Descrição</b>: remove o equipamento com id  {idEquipamento}.</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
            <div style="margin-left:5px;text-align:center">/equipamento/dividaEquipamento/editar/:idDividaEquipamento</div>
        </div>
        <p><b>Descrição</b>: renderiza a página de edição de uma divida de um equipamento.
  Após modificar o estado da divida, o diretor pode cancelar a edição
  e voltar a página principal ou atualizar o tal estado que modificou da divida.</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
            <div style="margin-left:5px;text-align:center">/equipamento/dividaEquipamento/editar</div>
        </div>
        <p><b>Descrição</b>: atualiza o estado da dívida de um equipamento.
  A dívida do equipamento é enviada através do <i>req.body</i> (juntamente
  com o seu ID)</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
            <div style="margin-left:5px;text-align:center">/utilizador</div>
        </div>
        <p><b>Descrição</b>: renderiza a página de utilizadores. Esta página contém:
        <ul>
        <li>formulário para adição de um novo utilizador (sócio ou diretor);
        <li>listagem de todos os utilizadores, com a opção de edição de todos os campos do utilizador, assim como a remoção de um utilizador;</p>
    </li>
    </ul>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
            <div style="margin-left:5px;text-align:center">/utilizador</div>
        </div>
        <p><b>Descrição</b>: realiza o registo de um utilizador. Os dados do utilizador
  são enviados através do req.body. Apenas diretores podem criar novos utilizadores.</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
            <div style="margin-left:5px;text-align:center">/utilizador/editar/:idUtilizador</div>
        </div>
        <p><b>Descrição</b>: renderiza a página de edição dos dados do utilizador na vista do diretor (é possível modificar todos os campos do utilizador).</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
            <div style="margin-left:5px;text-align:center">/utilizador/editar/:idUtilizador</div>
        </div>
        <p><b>Descrição</b>: realiza a atualização do utilizador após a confirmação do formulário de edição dos seus dados.  Os dados do utilizador
  são enviados através do req.body.</p>
  </li>
  <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
            <div style="margin-left:5px;text-align:center">/utilizador/:idUtilizador</div>
        </div>
        <p><b>Descrição</b>: renderiza a página de visualização dos dados de um utilizador.</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
            <div style="margin-left:5px;text-align:center">/utilizador/remover/:idUser</div>
        </div>
        <p><b>Descrição</b>: remove o utilizador com id {idUser}.</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
            <div style="margin-left:5px;text-align:center">/notificacao</div>
        </div>
        <p><b>Descrição</b>: renderiza a página de notificações com a opção de visualizar, criar e editar as notificações.</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
            <div style="margin-left:5px;text-align:center">/notificacao/adicionar</div>
        </div>
        <p><b>Descrição</b>: adiciona uma nova notificação
  A notificação é enviada através do req.body.</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
            <div style="margin-left:5px;text-align:center">/notificacao/editar/:idNotificacao</div>
        </div>
        <p><b>Descrição</b>: renderiza a página de edição de uma notificação.
  Após modificar a notificação, o diretor pode cancelar a edição
  e voltar a página de notificações ou confirmar a modificação da notificação.</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
            <div style="margin-left:5px;text-align:center">/notificacao/editar</div>
        </div>
        <p><b>Descrição</b>: atualiza uma notificação. Os dados a serem alterados
  da notificação são enviados através do req.body (juntamente
  com o seu ID).</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
            <div style="margin-left:5px;text-align:center">/remover/:idNotificacao</div>
        </div>
        <p><b>Descrição</b>: remove a notificação com id {idNotificacao}.</p>
    </li>
    <li>
        <div style="display:flex;text-align:center">
            <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
            <div style="margin-left:5px;text-align:center">/notificacao/filtro</div>
        </div>
        <p><b>Descrição</b>: renderiza a página de notificações segundo o filtro selecionado para as notificações (o filtro é enviado através do <i>req.body</i>).</p>
    </li>
</ul>