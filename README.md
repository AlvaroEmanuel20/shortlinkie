# ShortLinkie API

Este repositório contém o código-fonte de uma API REST para encurtar e gerenciar URLs chamado ShortLinkie. A API permite que você gerencie seus links com encurtador e faça o rastreamento de cliques.

## Funcionalidades

- Encurtar links
- Rastrear a quantidade de cliques em cada link
- Rastrear origens diferentes de cliques (Exemplo: ?src=instagram)

Além da parte técnica que permite essas funcionalidades:

- Autenticação com envio de email utilizando a integração com Brevo
- Procedimento para resetar senha
- Integração com banco de dados usando Prisma ORM

## Configuração do Ambiente

Para executar esse projeto localmente, você precisará configurar seu ambiente de desenvolvimento. Siga as etapas abaixo para iniciar:

1) Clone este repositório em seu ambiente local:

```bash
 git clone https://github.com/AlvaroEmanuel20/shortlinkie.git
```

2) Instale as dependências do projeto:

```bash
  npm install
```

3) Configure as variáveis de ambiente necessárias, como as credenciais de banco de dados e chaves de API. Para isso há um arquivo `.env.example` com as variáveis de ambiente usadas.

## Uso do Aplicativo

Após configurar o ambiente, você pode iniciar o aplicativo ShortLinkie. Aqui estão alguns comandos úteis para usar o aplicativo:

- Para iniciar o servidor localmente:

```bash
 npm run dev
```

## Contato

Se você tiver alguma dúvida ou precisar entrar em contato, pode fazê-lo por meio do meu perfil no GitHub: [AlvaroEmanuel20](https://github.com/AlvaroEmanuel20).
