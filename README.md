# - DevQuest -

# Desafio [![My Skills](https://skillicons.dev/icons?i=react)](https://skillicons.dev) <br> PokeAPI <img src="./public/readme/images/pokeball-300.png" width="30">
<br>

## Índice
- [Pokémon Cards App](#pokémon-cards-app)
- [Funcionalidades](#funcionalidades)
- [Telas](#telas)
  -  [Desktop](#desktop)
  -  [Mobile](https://github.com/MateusRissoDiBlasio/Pokemon?tab=readme-ov-file#mobile-)
  -  [Clipe](https://github.com/MateusRissoDiBlasio/Pokemon/tree/main#clipe-)
    
- [Aprendizagem](#aprendizagem)
  - [Fases de Todo Processo](#fases-de-todo-processo)
  - [Evolução](#evolução)
  - [Ferramentas Utilizadas](#ferramentas-utilizadas)
  
- [Instalação](#procedimentos-para-instalação-e-execução-do-app)
- [Autor](#autor)

<br>

## Pokémon Cards App

<div align="justify">

Esta aplicação foi desenvolvida para que através da API PokeAPI apresentar aos usuários listas de Pokémons, nas
quais é possível através de um clique em algum Pokémon apresentado na tela em formato de Cartão, obter acesso
às informações sobre o respectivo Pokémon em uma outra página interna. Seus Tipo(s), Habilidade(s) e Movimentos.

A lista inicial "Pokémons Aleatórios" contém 10 cards, logo abaixo da lista há um botão, que a cada
clique acrescenta 10 à lista inicial.
    
Nesta mesma página há um campo de input onde é possível obter acesso ao card do pokémon através apenas do nome. Para
tornar possível esse objetivo, limitei a possibilidade de inserir números, símbolos, espaços em branco ' ', gerando
um alerta para cada possível "erro" no campo e uma mensagem em vermelho, foram permitidas as exceções encontradas,
nomes nos quais há números e "-" em sua composição.

Há a opção de filtrar por seleção de tipo, em listas de Pokémons pelo tipo, onde também há um botão para carregar
mais itens até atingir o limite de Pokémons encontrados de acordo com a seleção. 

Ao mover o cursor sobre os cards, há o efeito de mudança de cor, e apresenta a mensagem "Click for details".
Funcionalidade não implementada na versão mobile.

Na página de detalhes, o usuário pode retornar à página inicial clicando no botão "Go back", outra maneira de
retornar à pagina principal é clicando na Logo do Pokémon na barra do menu. E também pode-se alternar entre os
temas "Light/Dark".

Por padrão preferi utilizar o Inglês como idioma do app. 
</div>

## Funcionalidades:

<div align="justify">

- Botão de "scroll up" - em formato de seta pra cima - para retornar ao topo da página, condicionado ao tamanho atual da página, após incrementar as listas de Pokémons Aleatórios e por tipo o botão é inserido na página, tornando-se um atalho mais fácil retornar ao início da página.

- Botão para alternar entre os temas "Light" (Claro) e "Dark" (Escuro), opção para alternar as propriedades dos componentes por temas.
    
- Ao iniciar a implementação do app me deparei com algumas situações nas quais me desafiei a minimizar possíveis erros/falhas no retorno das informações acessadas na API, exemplos: Pokémons sem imagem de retorno, busquei caminhos para imagens alternativas, e criei imagens padrão onde este dado não era disponibilizado.

- Aviso de "Loading" ao clicar em botões que realizam solicitações à API. Forma encontrada de prevenir possíveis erros na lista de Pokémons por Tipo, ao carregar mais Pokémons.

- Ao alternar entre as opções por tipo do campo "Select" eram apresentadas falhas nas listas, divergências nas quantidades de Pokémons nos resultados finais, a solução encontrada foi a inserção de um botão com um ícone animado de um cadeado, tornando mais fácil o entendimento da função do botão que ao realizar a seleção o campo "Select" fica inativo, ativando o botão "Unlock Selection" que permitirá liberar a alteração do campo "Select". Ao chegar ao final da lista por Tipo, é apresentada uma mensagem com a quantidade e o tipo de Pokémons nalista apresentada.

- Inseri algumas imagens ao projeto que não são diretamente da API, referentes aos tipos de Pokémons.

- Na tela de detalhes do Pokémon, ao realizar testes, constatei que existem Pokémons com apenas uma habilidade, sem movimentos listados, e de apenas um tipo. Realizei as adequações para apresentar as informações de forma coerente.

- Outra possível falha encontrada durante o processo, a lista de habilidades retornavam dados em duplicidade, inseri um filtro para trazer habilidades únicas, realizando a comparação pelo nome da habilidade, e a descrição da habilidade aparecia de forma intercalada entre idiomas diferentes, Alemão, Inglês, Italiano, etc, não seguindo um padrão. Realizei o filtro, puxando somente no idioma Inglês, buscando padronizar as informações.

- A aplicação desenvolvida é compatível com dispositivos móveis.

- Estilização realizada com o styled-components, react-router para as rotas e o API Context para para a criação de um Theme Toggle (alternar entre temas: claro e escuro).

</div>

# Telas

## Desktop

### HomePage
<a href="#" target="_blank">
  <img src="./public/readme/images/HomePage.png">
</a>

### By Type List
<a href="#" target="_blank">
  <img src="./public/readme/images/TypeListExample.png">
</a>

### Details Page

<div align="center">

<a href="#" target="_blank">
  <img src="./public/readme/images/DetailPage.png">
</a>

</div>

## Mobile <img src="./public/readme/images/cellphonebig.png" width="30">

 
<div align="center">
<div>
    
### Detail Page (Portrait Orientation) Light Theme
<a href="#" target="_blank">                                  
  <img src="./public/readme/images/cellphonedisplay.png" width="240">
</a> 
</div>

<div>
    
### Detail Page (Landscape Orientation) Dark Theme
<a href="#" target="_blank">    
  <img src="./public/readme/images/cellphonedisplaylandscape.png" width="420">
</a>
</div>
</div>

## Clipe <img src="./public/readme/images/100px.gif" width="50">

<div align="center">
    
https://github.com/user-attachments/assets/5feb012c-3853-49d7-bfff-c0e3aad42da5

</div>

# Aprendizagem

## Fases de Todo Processo

<div align="justify">

Em diversos momentos fiquei travado, e somente após ver e rever as possibilidades, de por em prática da forma que gostaria, realizar diversos testes, que me levavam a outros ajustes, consegui atingir o resultado pretendido.
Até o presente momento, foi o projeto mais desafiador que realizei, primeiro em manipulação de dados de um API, muitos testes para filtrar as informações específicas na estruturação do app.

As partes em que tive mais dificuldades, foram na filtragem das informações na página de detalhes de cada Pokémon filtrando os dados seguindo um padrão, que na API não estão, creio q de forma propositadamente. E na parte lógica de qual seria a forma de filtrar por tipo, e de que forma eu a faria. A mecânica que encontrei faz buscas por etapas, a cada 100 Pokémons de todos os possíveis, adiciona os do tipo informado, e ao clicar no botão "Load More" ele passa aos próximos 100 para filtrar novamente os próximos a serem renderizados, até atingir o número total disponível na API. E a parte que tive mais dificuldade, foi na prevenção de erros nos resultados dessa lista, objetivo alcançado após muitos e muitos testes.
Após percorrer por todos esses caminhos, pensar, repensar e aperfeiçoar, fiquei bastante satisfeito com o resultado alcançado.
  
</div>

## Evolução

<div align="justify">

Sempre haverá diversas formas de alcançar o mesmo objetivo, mais simples, mais complexas, mas o interessante, é o aprendizado obtido. E sempre buscar mais conhecimento para as soluções dentro de cada projeto. Sabendo que sempre haverá formas de aperfeiçoar, refatorar o código deve virar um lema.

</div>

## Ferramentas utilizadas

<div align="justify">

- React.js: utilizado para criar componentes e a interface do usuário, deixando o código mais limpo e sem o código se tornar muito repetitivo.
- Single Page Application (SPA), Página com estrutura SPA, tornando as respostas de navegação mais rápidas e sem necessidade de recarregar a página.
- Context API utilizado para criação dos temas "Light" (claro) e "Dark" (escuro). Maneira eficaz para estilização dos componentes em alternância dos temas escolhidos pelo usuário através do clique.
- Styled-components: biblioteca para realizar as estilizações de forma mais direta e dinâmica sem a necessidade de um arquivo .css.
- React-router-dom utilizado para realizar as ligações dos caminhos do SPA, exemplo: troca entre a home page e a página interna.
- Projeto criado com VITE.

</div>

# Procedimentos para instalação e execução do app

Certifique-se de que o Node.js está instalado em seu computador.

Faça um clone do repositório e acesse o diretório.
Para clonar o repositório, abra um terminal no VsCode - teclas de atalho: **`ctrl+shift+'`** . 

Na linha de comandos digite:

    git clone https://github.com/MateusRissoDiBlasio/Pokemon.git

Acesse o diretório:

    cd Pokemon

Instalação das dependências:

    npm install

Executar a aplicação:

    npm run dev

Clique no link gerado pelo terminal.


# Autor


<img loading="lazy" src="https://avatars.githubusercontent.com/u/139410293?s=400&u=42addb6ad785b3b4878173602d0b2a2437688fc5&v=4" width="115"><br><sub>Mateus Risso Di Blasio</sub> <br><br> <a href="https://www.instagram.com/devdiblasio/"><img src="https://img.shields.io/badge/Instagram-E4405F?style=flat&logo=instagram&logoColor=white"></a>&nbsp; <a href="https://www.linkedin.com/in/mateus-risso-443603321?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white"></a>&nbsp; <a href="https://github.com/MateusRissoDiBlasio"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white"></a>
