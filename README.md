# Coodesh Much Tech Challenge

Código criado para o desafio relacionado à vaga de Backend NodeJS na Coodesh.

Repositório do Desafio: https://github.com/delivery-much/challenge

&nbsp;

Menu:

- [Quem Sou](#quem-sou)
- [Ferramentas Utilizadas](#ferramentas-utilizadas)
- [Workflow](#workflow)
- [Instalação](#instalação)
- [Arquivo de configuração](#arquivo-de-configuração)
- [Executar o banco de dados com Docker](#executar-o-banco-de-dados-com-docker)
- [Executar o projeto](#executar-o-projeto)
- [Testes Unitários](#testes-unitários)
- [Documentação da API](#documentação-da-api)
- [GitHub Actions](#github-actions)

&nbsp;

## Quem Sou

Projeto realizado por Tibério Ferreira Lima Brasil [tiberiobrasil@gmail.com](mailto:tiberiobrasil@gmail.com)

&nbsp;

## Ferramentas Utilizadas

Para desenvolvimento desse aplicativo foram utilizadas as ferramentas à seguir:

- NestJS (framework) utilizando Typescript
- TypeORM
- PostgreSQL
- Swagger (documentação da api)
- Jest (testes unitários e de integração)
- Lint e Prettier (formatação e qualidade do código)

&nbsp;

## Workflow

Foram criadas duas principais branches no GitHub:

- `develop` - Branch principal. Sempre que um novo merge é enviado ao repositório por padrão será feito nela.
- `master` - Branch de produção. O código deve ser testado na branch específica de onde foi criado e após os testes deve ser mergeado na develop. Caso esteja tudo OK deve ser feito um Release da branch develop para a master, inserindo as atualizações no servidor de produção.

Sempre que uma nova MR for feita a mesma deve estar em uma branch específica utilizando o `gitmoji`.

O GitHub actions entra em ação sempre que uma novo pull ou merge request é feito no repositório. Serão realizados os testes unitários, garantindo o funcionamento das alterações e o linting do projeto, garantindo a formatação e qualidade do código.

&nbsp;

## Instalação

Executar o comando para instalar as dependências

```bash
$ yarn
# ou
$ npm install
```

&nbsp;

## Arquivo de configuração

Criar um arquivo `.env` baseado no arquivo `.env.example`, editando os valores que já existem, caso necessário, e inserindo os que estão vazios.

&nbsp;

## Executar o banco de dados com Docker

Executar o comando:

```bash
$ docker-compose build
$ docker-compose up
```

OBS: esse comando inicializará o banco de dados

&nbsp;

## Executar o projeto

Executar o comando:

```bash
$ yarn start:dev
# ou
$ npm run start:dev
```

OBS: o banco de dados deve estar inicializado.

&nbsp;

## Collection Postman

A collection do Postman está disponível no link abaixo:

`https://www.getpostman.com/collections/4297c7a648fd8f55e55e`

&nbsp;

## Acesso ao projeto

Após executar o projeto o mesmo poderá ser visualizado através da URL:

`http://localhost:{PORT}/`

Onde `{PORT}` é o valor da porta configurada no arquivo `.env`.
Mais detalhes podem ser vistos na [Documentação da API](#Documentação-da-API).

&nbsp;

## Testes Unitários

Executar testes unitários nos services e controllers:

```bash
$ yarn test
# ou
$ npm run test
```

&nbsp;

## Documentação da API

Foi utilizada a lib Swagger para documentar a API. A mesma pode ser vista em:

`http://localhost:{PORT}/docs`

Onde `{PORT}` é o valor da porta configurada no arquivo `.env`.

&nbsp;

## GitHub Actions

Criado worflow no GitHub Actions para que sempre que um novo `push` ou `merge` for feito ao repositório uma série de comando serão executados.

Dentre os comandos estão a garantis que os testes não contém erros e que também não há erros de linting no projeto, garantindo a padronização do código.

Para mais informações acessar o arquivo:

`.github/worflows/main.yml`
