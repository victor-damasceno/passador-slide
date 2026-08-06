# Passador de Slides

Este projeto foi desenvolvido para facilitar o controle de apresentações de slides a partir de um navegador. A ideia é permitir que um dispositivo envie comandos para outro de forma simples, tornando a navegação entre os slides mais prática.

O projeto utiliza **Node.js** no backend e uma interface web simples para realizar a comunicação entre cliente e servidor.

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* Node.js
* Express
* Socket.IO

## Estrutura do projeto

```text
passador-slide/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── controller.js
│   └── index.html
├── server.js
├── package.json
└── README.md
```

## Como utilizar

Para utilizar a aplicação, siga os passos abaixo:

1. Acesse a página do projeto hospedada na Vercel.
2. Baixe a versão mais recente do aplicativo (`.exe`).
3. Execute o aplicativo no computador. Ao iniciar, ele irá gerar um código de conexão.
4. Acesse a aplicação web, através do celular, hospedada no Render.
5. Informe o código gerado pelo aplicativo para estabelecer a conexão.
6. Após a conexão ser realizada, você poderá controlar a apresentação de slides diretamente pelo navegador.

> **Vercel (download do aplicativo):** https://site-slide-remote.vercel.app/
> **Render (aplicação web):** https://passador-slide.onrender.com/


## Objetivo

Este projeto foi criado como uma forma de praticar conceitos de desenvolvimento web, comunicação em tempo real utilizando Socket.IO e organização de aplicações Node.js. Além da funcionalidade em si, ele também serviu para aprofundar conhecimentos sobre estruturação de projetos e boas práticas de desenvolvimento.

## Melhorias futuras

* Interface mais moderna e responsiva.
* Autenticação entre os dispositivos.
* Suporte para diferentes modos de apresentação.
* Histórico de conexões.
* Configuração personalizada das teclas de controle.

## Licença

Este projeto está disponível para estudos e fins educacionais.
