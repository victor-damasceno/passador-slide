# 📡 Slide Remote

Controle remoto de apresentações em tempo real via celular, sem mesma rede Wi-Fi, sem Bluetooth, sem cabo.

## 📌 Sobre o projeto

O Slide Remote permite que apresentadores controlem slides do PowerPoint, PDF e outros programas usando o **celular como controle remoto**, independentemente da rede em que cada dispositivo está conectado.

A comunicação acontece através de um servidor intermediário na nuvem via **WebSocket**, garantindo baixa latência e funcionamento em qualquer ambiente.


## 🏗️ Arquitetura

```
[Celular — site no browser]
         |
         | WebSocket (wss://)
         ▼
[Servidor Node.js — Render]
         |
         | WebSocket (wss://)
         ▼
[Aplicativo .exe — Windows]
         |
         | pyautogui (API do SO)
         ▼
[PowerPoint / PDF / qualquer programa]
```

### Sistema de salas por código

Ao abrir o `.exe`, um código de 6 dígitos é gerado e uma **sala** é criada no servidor com esse código. O celular digita o mesmo código e entra na mesma sala, estabelecendo a comunicação entre os dois dispositivos.


## 🗂️ Estrutura do repositório

```
passador-slide/
├── public/
│   └── index.html        # Interface web para o celular
├── server.js             # Servidor WebSocket (Node.js)
└── package.json          # Dependências e configuração
```

> O aplicativo desktop (`.exe`) está em um repositório separado e é distribuído via release.


## 📱 Como usar na prática

1. **No computador:** abra o `SlideRemote.exe` — um código de 6 dígitos é gerado na tela
2. **No celular:** acesse o link do site, digite o código e clique em **Conectar**
3. **Pronto:** use as setas ◀ ▶ no celular para passar os slides


## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| Node.js + Express | Servidor HTTP e roteamento |
| ws | Servidor WebSocket e gerenciamento de salas |
| HTML / CSS / JS | Interface web responsiva para celular |
| Python + Tkinter | Aplicativo desktop Windows |
| pyautogui | Simulação de teclas via API do sistema operacional |
| Render | Hospedagem do servidor na nuvem |


## 📄 Licença

Este projeto é de uso livre para fins pessoais e educacionais.
