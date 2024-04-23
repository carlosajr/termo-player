                            ______   ______     ______     __    __     ______
                           /\__  _\ /\  ___\   /\  == \   /\ "-./  \   /\  __ \
                           \/_/\ \/ \ \  __\   \ \  __<   \ \ \-./\ \  \ \ \/\ \
                              \ \_\  \ \_____\  \ \_\ \_\  \ \_\ \ \_\  \ \_____\
                               \/_/   \/_____/   \/_/ /_/   \/_/  \/_/   \/_____/

                            ______   __         ______     __  __     ______     ______
                           /\  == \ /\ \       /\  __ \   /\ \_\ \   /\  ___\   /\  == \
                           \ \  _-/ \ \ \____  \ \  __ \  \ \____ \  \ \  __\   \ \  __<
                            \ \_\    \ \_____\  \ \_\ \_\  \/\_____\  \ \_____\  \ \_\ \_\
                             \/_/     \/_____/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/

<img src="https://s9.gifyu.com/images/SZrYf.gif">

## 📋 Tecnologias

Foram usadas na construção do projeto as seguintes ferramentas

- <img align="center" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" /> Node.js

- <img align="center" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/puppeteer/puppeteer-original.svg" /> Puppeteer

## 📋 Metodologia

🎲 Foi utilizado o banco de dados de palavras na língua portuguesa do brasil disponibilizado pelo IME USP, com 261.799 palavras, que pode ser acessado por <a target="_blank" href="https://www.ime.usp.br/~pf/dicios/index.html"> aqui. </a>

🛠 Com o puppeteer conseguimos interagir com o navegador, por meio de _web scraping_, tanto para obter informações quanto para executar ações.

#### Preparação:

- Filtrar dentre as palavras as que tem 5 letras, remover acentos, caracteres especiais, colocar em maiusculo e gerar um arquivo JSON com o resultado.
- Durante a conversão é verificado as letras mais utilizadas nas palavras para futuramente obter as palavras com maior probabilidade de ser a certa.

#### Execução:

- Escolher a melhor palavra para iniciar levando em consideração a palavra com mais letras distintas e mais ocorrências identificadas na conversão.
- Escrever a palavra

- Obter letras que não estão na palavra
- Obter letras que não estão na posição correta
- Obter letras estão na posição correta

- Filtrar as palavras que não contem as letras indicadas pelo Termo
- Filtrar as palavras que contem as letras posicionadas
- Filtrar as palavras que contem as letras fora de posição

- Escolher uma nova palavra dentre as palavras filtradas
- Escrever a nova palavra

- Repetir até ganhar

## 📋 Passo a passo

### Instalação

Para instalar as dependências do projeto, execute o seguinte comando:

```bash
npm install
```

### Preparação

Antes de executar o projeto, você precisará compilar o código. Para isso, execute o seguinte comando:

```bash
npm run build
```

### Execução

Depois de preparar o projeto, você pode executá-lo localmente com o seguinte comando:

```bash
npm run play
```
