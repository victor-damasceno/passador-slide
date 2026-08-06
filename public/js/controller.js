const WS_URL = location.origin.replace(/^http/, 'ws');

let ws = null;
let myCode = null;
let lastSent = 0;

function closeWs() {
  if (ws) { try { ws.close(); } catch(e){} ws = null; }
}

function connectWS(onOpen) {
  closeWs();
  ws = new WebSocket(WS_URL);
  ws.onopen = onOpen;
  ws.onerror = () => {};
  return ws;
}

// Modo controle - Pelo celular

function connectAsController() {
  const code = document.getElementById('code-input').value.trim();
  const err  = document.getElementById('ctrl-err');
  const btn  = document.getElementById('btn-conn');

  if (code.length < 6) { err.textContent = 'Digite o código de 6 dígitos.'; return; }

  err.textContent = '';
  btn.disabled = true;
  btn.textContent = 'Conectando...';
  myCode = code;

  connectWS(() => {
    ws.send(JSON.stringify({ type: 'join', role: 'controller', code }));
  });

  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.type === 'peer_connected') {
      document.getElementById('form-connect').style.display = 'none';
      document.getElementById('nav-controls').style.display = 'flex';
    }
  };

  ws.onerror = () => {
    err.textContent = 'Erro de conexão. Tente novamente.';
    btn.disabled = false; btn.textContent = 'Conectar';
  };

  ws.onclose = () => {
    if (document.getElementById('nav-controls').style.display === 'flex') {
      document.getElementById('nav-controls').style.display = 'none';
      document.getElementById('form-connect').style.display = 'flex';
      err.textContent = 'Conexão encerrada.';
      btn.disabled = false; btn.textContent = 'Conectar';
    }
  };

  setTimeout(() => {
    if (document.getElementById('nav-controls').style.display !== 'flex') {
      err.textContent = 'Receptor não encontrado. Verifique o código.';
      btn.disabled = false; btn.textContent = 'Conectar';
      closeWs();
    }
  }, 10000);
}

function disconnectController() {
  closeWs();
  document.getElementById('nav-controls').style.display = 'none';
  document.getElementById('form-connect').style.display = 'flex';
  document.getElementById('btn-conn').disabled = false;
  document.getElementById('btn-conn').textContent = 'Conectar';
  document.getElementById('code-input').value = '';
  document.getElementById('ctrl-err').textContent = 'Desconectado.';
}

// Enviar comandos

function press(cmd) {
  document.getElementById(cmd === 'next' ? 'btn-next' : 'btn-prev').classList.add('pressed');
  const now = Date.now();
  if (now - lastSent < 350) return;
  lastSent = now;

  if (ws && ws.readyState === 1) {
    ws.send(JSON.stringify({ type: 'cmd', cmd }));
    const fb = document.getElementById('feedback');
    fb.style.opacity = '1';
    fb.textContent = cmd === 'next' ? '▶ Próximo slide' : '◀ Slide anterior';
    setTimeout(() => { fb.style.opacity = '0'; }, 900);
  }
}

function release(cmd) {
  document.getElementById(cmd === 'next' ? 'btn-next' : 'btn-prev').classList.remove('pressed');
}
