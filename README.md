<svg fill="none" viewBox="0 0 800 10000" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
            <style>
                .container {
                    display: flex;
                    width: 100%;
                    height: 300px;
                    background-color: black;
                    color: white;
                }
                .delete {
                    background-color:red;
                    padding:3px;
                    width:60px;
                    text-align:center;
                }
            </style>
            <h1 style="font-size:60px" align="center"><img height=28cm src="images/logo.png"> COM</h1>
            <h4 align="center">Plataforma de gestão do Clube de Orientação do Minho. A Orientação é um desporto ao ar livre que exercita a mente e o corpo, onde tu defines o teu próprio caminho entre pontos marcados num mapa!</h4>
            <br>
            <img src="images/banner.png">
            <br>
            <h1>Sumário</h1>
            <ol>
                <li><a href="#dominio">Definição do Domínio</a>
                    <ol>
                    <li><a href="#org2ddc0f9">Contextualização</a></li>
                    <li><a href="#org2a1cae2">Fundamentação</a></li>
                    <li><a href="#org597515c">Objetivos</a></li>
                    </ol>
                </li>
                <li><a href="#especificacao">Especificação dos Requisitos</a>
                    <ol>
                    <li><a href="#org15945ad">Utilizadores</a>
                        <ol>
                        <li><a href="#org45bfd79">Funcionais</a></li>
                        <li><a href="#org477c1df">Não funcionais</a></li>
                        <li><a href="#org43310ab">Sócio</a></li>
                        <li><a href="#orgc0b2ede">Direção</a></li>
                        </ol>
                    </li>
                    <li><a href="#orgc0bdb1b">Sistema</a>
                        <ol>
                        <li><a href="#org0e2ccc1">Funcionais</a></li>
                        <li><a href="#org9fd4947">Não funcionais</a></li>
                        </ol>
                    </li>
                    </ol>
                </li>
                <li><a href="#modelacao">Modelação do Sistema</a>
                    <ol>
                    <li><a href="#modelacao">Arquitetura</a></li>
                    <li><a href="#api">API COM</a></li>
                    <li><a href="#auth">Auth COM</a></li>
                    <li><a href="#interface">Interface COM</a></li>
                    </ol>
                </li>
            </ol>
            <a id="dominio"></a>
            <h1> Definição do Domínio </h1>
            <a id="org2ddc0f9"></a>
            <h2> Contextualização </h2>
            O .COM - Clube de Orientação do Minho, é uma associação desportiva e recreativa, de fins não lucrativos, sedeada em Braga e cujos objectivos são o desenvolvimento e a promoção da prática da Orientação e de actividades de ar livre, na região do Minho. Fundado em 12 de dezembro de 2002, por antigos membros da ARCCa - Associação Recreativa e Cultural do Campo.
            A dimensão do clube é considerada pequena, devido à afluência de desportista do desporto de orientação. O clube conta com cerca de 200 sócios sendo a maioria da região do Distrito de Braga.
            <a id="org2a1cae2"></a>
            <h2> Fundamentação </h2>
            Nos últimos anos o clube tem sentido algumas dificuldades na gestão de informação interna e na informação que disponibiliza aos sócios. As folhas de cálculo que têm que ser renovadas ano após ano funcionam, mas não oferecem muita flexibilidade para o futuro e todos os anos a criação de uma nova folha pode levar a erros que poodem levar a erros financeiros que podem levar ao fim do clube.
            A sensação de um utilizador interno desta ferramenta é que não sente segurança ao usar estas folhas porque não existe muita documentação nem uma interface de fácil gestão dos dados. Assim sendo, tem medo de alterar informação ou danificar dados ao aceder de forma direta aos dados da folha de cálculo.
            Para terminar com a necessidade da criação de novas folhas de forma anual o clube decidiu implementar uma base de dados e uma interface gráfica que possibilite a gestão da informação pela direção do clube (gestão interna) e o acesso de informação relevante aos sócios, como dívidas do sócio.
            <a id="org597515c"></a>
            <h2> Objetivos </h2>
            <ul> 
                <li>   Melhorar capacidade de gestão interna </li> 
                <li>   Gestão indireta da base de dados através de uma interface gráfica </li> 
                <li>   Ter um histórico dos gastos do clube e receitas superior a um ano </li> 
                <li>  Melhorar a disponibilização de informação ao sócio </li> 
            </ul> 
            <a id="especificacao"></a>
            <h1> Especificação dos Requisitos </h1>
            <a id="org15945ad"></a>
            <h2> Utilizadores </h2>
            <a id="org45bfd79"></a>
            <h3> Funcionais </h3>
            <ul> 
                <li>   O utilizador tem de se autenticar na plataforma para a poder utilizar [MUST] </li>
                <li>   O utilizador pode efetuar logout da aplicação [MUST] </li>
                <li>   O utilizador edita o seu perfil [MUST] </li>
            </ul>
            <a id="org477c1df"></a>
            <h3> Não funcionais </h3>
            O utilizador é caracterizado por:
            <ul> 
                <li>   ID (Nº Sócio?) </li>
                <li>   Nome </li>
                <li>   Data Nascimento </li>
                <li>   Idade </li>
                <li>   Sexo </li>
                <li>   BI/CC </li>
                <li>   Nº FPO </li>
                <li>   e-mail </li>
                <li>   telemóvel </li>
                <li>   Telefone fixo </li>
                <li>   Morada </li>
                <li>   Data de admissão </li>
                <li>   Observações </li>
                <li>   Se é ativo </li>
            </ul> 
            <a id="org43310ab"></a>
            <h3> Sócio </h3>
            <h4>Funcionais</h4>
            <ul> 
                <li> O sócio pode consultar um histórico de despesas e receitas [MUST]
                <li>   O sócio pode filtrar despesas por categoria. (Equipamentos, Transportes, Inscrições, Outro, Cotas) [MUST]
                <li>   O sócio pode filtrar receitas por categoria (Apoio ao Km, outro) [MUST]
                <li>   O sócio deve poder consultar um sumário do balanço despesas/receitas [MUST]
                <li>   O sócio deve poder requisitar equipamentos. [MUST]
                <li>   Ao requisitar um equipamento devem saber se o equipamento está disponível e o preço do equipamento [MUST]
                <li>   O sócio deve poder ter opção de pagar as dívidas. [OPTIONAL]
                <li> O sócio deve poder aceder a uma página que lista as últimas notificações/comunicados do clube [OPTINAL]
            </ul>
            <a id="orgc0b2ede"></a>
            <h3> Direção </h3>
            <ul> 
                <li>   Um membro da direção deve poder aceder a uma lista de sócios [MUST]
                <li> Um membro da direção deve poder adicionar comunicados numa página de notificações da plataforma do clube [OPTIONAL]
                <li>  Equipamentos
                    <ul>
                       <li> Funcionais
                            <ul>
                                <li> Um membro da direção deve poder gerir stock de equipamentos. Deve poder adicionar novos equipamentos. [MUST]
                                <li>   Deve ser possível criar uma nova categoria de equipamento [OPTIONAL]
                                <li>   Um membro da direção deve poder ver uma lista de pedidos de requisição de equipamentos por entregar [MUST]
                                <li>   Um membro da direção deve poder alterar o estado de um pedido de requisição de equipamento. [MUST]
                            </ul>
                        <li>  Não funcionais
                        <br>
                        Um equipamento é caracterizado por:
                        <ul>
                            <li> Cod Equipamento (número único que represente um lote de encomenda)
                            <li> Mapeamento entre tamanho e stock disponível
                            <li> Tipo de equipamento (Tshirt, Tshirt cavas, Polo, Sweat, Casaco, Calças, Corçarios)
                            <li> Custo equipamento
                            <li> Percentagem de desconto
                        </ul>
                        O estado de um pedido de requisição de equipamento deve ser:
                        <ul>
                            <li>Não entregue, entregue (e pago [OPTIONAL])
                        </ul>
                    </ul>
                <li> Eventos
                    <ul>
                        <li>Funcionais
                            <ul>
                                <li>   Um membro da direção deve poder adicionar eventos. [MUST]
                                <li>   Um membro da direção deve poder adicionar sócios a eventos criados. [MUST]
                                <li>   Um membro da direção deve poder associar despesas de inscrição que o sócio tem que pagar a um evento. [MUST]
                               <li> Um membro da direção deve poder associar um sócio que levou o seu carro a um evento. Sendo que o sistema deve calcular o valor que o clube deve ao sócio pelo apoio ao km. [MUST]
                                <li>    Um membro da direção deve poder associar um sócio a um veículo no qual o sócio está alocado [OPTIONAL]
                                <li>    Um membro da direção deve poder associar um ponto de encontro e uma hora de saída a um veículo [OPTIONAL]
                            </ul>
                        <li>Não funcionais
                        <br>
                        Um evento é caracterizado por:
                            <ul>
                                <li>   Nome de evento
                                <li>   Localização
                                <li>   Intervalo de data de realização (Data início e data fim)
                                <li>   Lista de sócios inscritos/confirmados num evento
                                <li>   Tipo (Participação ou organização)
                                <li>   Associações entre sócios inscritos e depesas/receitas do sócio.
                                    <ul>
                                        <li>   As despesas são divididas em Transporte e inscrições
                                        <li>   As receitas são equivalentes ao apoio ao km que o clube deve ao sócio
                                    </ul>
                                <li>   Associações entre sócios e em que veículos vão [OPTIONAL]
                                <li>   Informação sobre o ponto de encontro e hora de encontro de cada veículo para sair [OPTIONAL]
                            </ul>
                    </ul>
                <li>  Comunicados/Notificações [OPTIONAL]
                    <ul>
                        <li>  Funcionais
                            <ul>
                                <li>   Um membro da direção deve poder adicionar comunicados/notificações sobre informações ache pertinente [OPTIONAL]
                            </ul>
                        <li>  Não funcionais
                            <ul>
                                <li> Um comunicado é caracterizado por uma mensagem, data de emissão [OPTIONAL]
                            </ul>
                    </ul>
                <li>  Contabilidade
                    <ul>
                        <li>  Funcionais
                            <ul>
                                <li>   Deve poder criar novas categorias de gestão financeira. [MUST]
                                    <ul>
                                        <li>   Preparação (divulgação, prémios )
                                        <li>   Meios técnicos e materiais (material informático, mapas orientação, material orientação)
                                        <li>   Estrutura (alimentação, água, eletrecidade)
                                        <li>   Logística (Alimentação, alojamento, transporte, inscrições provas, equipamentos de competição)
                                    </ul>
                                <li>   Deve poder adicionar uma entrada de receita [MUST]
                                <li>   Deve poder adicionar uma entrada de  despesa [MUST]
                            </ul>
                        <li>  Não funcionais
                            <ul>  
                                <li> As categorias de gestão financeira são caracterizadas por:
                                    <ul>
                                        <li>   Código
                                        <li>   Nome Categoria
                                        <li>   Descrição
                                        <li>   Subcategoria (Uma subcategoria é uma categoria)
                                    </ul>
                                <li>  Uma receita é caracterizada por:
                                    <ul>
                                        <li>   Ordem (código da receita)
                                        <li>   Nome da receita
                                        <li>   Atividade (Evento associado à receita, opcional)
                                        <li>   Nº sócio (opcional pode ser uma receita externa)
                                        <li>   Responsável (quem pagou)
                                        <li>   Valor pago
                                        <li>   Data
                                        <li>   Categoria de receita
                                    </ul>
                                <li>  Uma despesa é caracterizada por:
                                    <ul>
                                        <li> Ordem (código da despesa)
                                        <li> Natureza da Despesa
                                        <li>   Evento (opcional)
                                        <li>   Nome da despesa
                                        <li>   NIF Fornecedor
                                        <li>   Nome do Fornecedor
                                        <li>   Nº Doc. Fornecedor
                                        <li>   Data da despesa
                                        <li>   Valor total do Doc.
                                        <li>   Código de despesa
                                        <li>   Valor Real a Pagar (Qual a diferença para o Valor total do documento?)
                                        <li>   Responsável (A quem se tem que pagar)
                                        <li>   Nº sócio (Se a pessoa for interna)
                                        <li>   Forma de pagamento
                                        <li>   Estado (Por pagar ou pago)
                                        <li>   Quem lançou
                                        <li>   Data de Lançamento
                                    </ul>
                            </ul>
                        </ul>
            <a id="orgc0bdb1b"></a>
            <h2> Sistema </h2>
            <a id="org0e2ccc1"></a>
            <h3> Funcionais </h3>
            <ul>
                <li>   O sistema deve calcular o preço de um equipamento com base se o utilizador tem direito a desconto ou não. Um sócio tem desconto num determinado artigo se a sua última requisição de um determinado tipo de artigo foi há mais de dois anos. [MUST]
                <li>   O sistema deve requisitar o valor anual das cotas aos sócios ativos [MUST]
                <li>   O sistema deve requisitar o valor da jóia a novos sócios do clube. [MUST]
            </ul>
            <a id="org9fd4947"></a>
            <h3> Não funcionais </h3>
            <ul>
                <li>   O sistema deve ter uma interface gráfica na web [MUST]
                <li>   O sistema deve ter autenticação por tokens [MUST]
            </ul>
            <a id="modelacao"></a>
            <h1> Modelação do Sistema </h1>
            <a id="arquitetura"></a>
            <h2> Arquitetura </h2>
            <a id="api"></a>
            <h2> API COM </h2>
            A API de dados do sistema COM possui as operações CRUD associadas aos  verbos HTTP sobre os seguintes dados:
            <ul style="list-style: none;">
                <li>
                    <h2><b>/equipamento</b></h2>
                    <ul style="list-style: none;">
                        <li>
                            <div style="display:flex;text-align:center">
                                <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                                <div style="margin-left:5px;text-align:center">/equipamento</div>
                            </div>
                        </li>
                        <li>
                            <div style="display:flex;text-align:center">
                                <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                                <div style="margin-left:5px;text-align:center">/equipamento/:idEquipamento</div>
                            </div>
                        </li>
                        <li>
                            <div style="display:flex;text-align:center">
                                <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
                                <div style="margin-left:5px;text-align:center">/equipamento</div>
                            </div>
                        </li>
                        <li>
                            <div style="display:flex;text-align:center">
                                <h4 class="delete"><b>DELETE</b></h4>
                                <div style="margin-left:5px;text-align:center">/equipamento/:idEquipamento</div>
                            </div>
                        </li>
                        <li>
                            <div style="display:flex;text-align:center">
                                <h4 style="background-color:orange;padding:3px;width:60px;text-align:center"><b>PUT</b></h4>
                                <div style="margin-left:5px;text-align:center">/equipamento/:idEquipamento</div>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <h2><b>/dividaEquipamento</b></h2>
                    <ul style="list-style: none;">
                        <li>
                            <div style="display:flex;text-align:center">
                                <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                                <div style="margin-left:5px;text-align:center">/dividaEquipamento</div>
                            </div>
                        </li>
                        <li>
                            <div style="display:flex;text-align:center">
                                <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                                <div style="margin-left:5px;text-align:center">/dividaEquipamento/:idDividaEquipamento</div>
                            </div>
                        </li>
                        <li>
                            <div style="display:flex;text-align:center">
                                <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
                                <div style="margin-left:5px;text-align:center">/dividaEquipamento</div>
                            </div>
                        </li>
                        <li>
                            <div style="display:flex;text-align:center">
                                <h4 style="background-color:orange;padding:3px;width:60px;text-align:center"><b>PUT</b></h4>
                                <div style="margin-left:5px;text-align:center">/dividaEquipamento/:idDividaEquipamento</div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
            <a id="auth"></a>
            <h2> Auth COM </h2>
            O processo de autenticação utilizado foi com JWT (<i>JSON Web Tokens</i>), juntamente com a estratégia de autenticação <b>local</b> da biblioteca <i>passport</i> no contexto do <i>plugin</i> passportLocalMongoose. Isto é, o <i>username</i> e <i>password</i> dos utilizadores são utilizados para realização do processo de <i>login</i> e, no caso de haver sucesso na verificação destes dados, é gerado um <i>token</i> JWT que é enviado ao cliente. A partir deste <i>token</i> as rotas da aplicação cliente são protegidas.
            O servidor de autenticação possui as operações relativas ao processo de criação, autenticação e atualização dos dados dos utilizadores. A seguir são listados os seus <i>endpoints</i>:
            <ul style="list-style: none;">
                <li>
                    <h2><b>/user</b></h2>
                    <ul style="list-style: none;">
                        <li>
                            <div style="display:flex;text-align:center">
                                <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                                <div style="margin-left:5px;text-align:center">/user</div>
                            </div>
                        </li>
                        <li>
                            <div style="display:flex;text-align:center">
                                <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                                <div style="margin-left:5px;text-align:center">/user/:id</div>
                            </div>
                        </li>
                        <li>
                            <div style="display:flex;text-align:center">
                                <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
                                <div style="margin-left:5px;text-align:center">/user/registo</div>
                            </div>
                        </li>
                        <li>
                            <div style="display:flex;text-align:center">
                                <h4 style="background-color:green;padding:3px;width:60px;text-align:center"><b>POST</b></h4>
                                <div style="margin-left:5px;text-align:center">/user/login</div>
                            </div>
                        </li>
                        <li>
                            <div style="display:flex;text-align:center">
                                <h4 style="background-color:orange;padding:3px;width:60px;text-align:center"><b>PUT</b></h4>
                                <div style="margin-left:5px;text-align:center">/user/:id</div>
                            </div>
                        </li>
                        <li>
                            <div style="display:flex;text-align:center">
                                <h4 style="background-color:red;padding:3px;width:60px;text-align:center"><b>DELETE</b></h4>
                                <div style="margin-left:5px;text-align:center">/user/:id</div>
                            </div>
                        </li>
                        <li>
                            <div style="display:flex;text-align:center">
                                <h4 style="background-color:orange;padding:3px;width:60px;text-align:center"><b>PUT</b></h4>
                                <div style="margin-left:5px;text-align:center">/user/:id/ativar</div>
                            </div>
                        </li>
                        <li>
                            <div style="display:flex;text-align:center">
                                <h4 style="background-color:orange;padding:3px;width:60px;text-align:center"><b>PUT</b></h4>
                                <div style="margin-left:5px;text-align:center">/user/:id/desativar</div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
            <a id="Interface COM"></a>
            <h2> Interface COM </h2>
            A interface gráfica possui funcionalidades e renderização de páginas mediante o nível (sócio ou diretor) do utilizador. A seguir são listadas as rotas e páginas da aplicação segundo as vistas dos utilizadores.
            <h3> Sócios </h3>
            <ul style="list-style: none;">
                <li>
                    <div style="display:flex;text-align:center">
                        <h4 style="background-color:blue;padding:3px;width:60px;text-align:center"><b>GET</b></h4>
                        <div style="margin-left:5px;text-align:center">/equipamento/socio</div>
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
            </ul>
            <h3> Diretores </h3>
            <ul style="list-style: none;">
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
            </ul>
        </div>
  </foreignObject>
</svg>