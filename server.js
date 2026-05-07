const express = require("express");
const { createServer } = require("http");
const { WebSocketServer } = require("ws");

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static("public"));

// rooms[code] = { receiver: ws | null, controller: ws | null }
const rooms = {};

function getOrCreate(code) {
  if (!rooms[code]) rooms[code] = { receiver: null, controller: null };
  return rooms[code];
}

function send(ws, data) {
  if (ws && ws.readyState === 1) ws.send(JSON.stringify(data));
}

wss.on("connection", (ws) => {
  let role = null;
  let code = null;

  ws.on("message", (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    // JOIN — dispositivo entra numa sala
    if (msg.type === "join") {
      role = msg.role;   // "receiver" ou "controller"
      code = msg.code;
      const room = getOrCreate(code);
      room[role] = ws;

      // Avisa o outro lado se já estiver conectado
      if (role === "receiver" && room.controller) {
        send(ws,            { type: "peer_connected" });
        send(room.controller, { type: "peer_connected" });
      }
      if (role === "controller" && room.receiver) {
        send(ws,           { type: "peer_connected" });
        send(room.receiver,  { type: "peer_connected" });
      }
      return;
    }

    // CMD — celular envia next/prev
    if (msg.type === "cmd" && code) {
      const room = rooms[code];
      if (room && room.receiver) {
        send(room.receiver, { type: "cmd", cmd: msg.cmd });
      }
    }
  });

  ws.on("close", () => {
    if (!code || !role) return;
    const room = rooms[code];
    if (!room) return;
    room[role] = null;
    const other = role === "receiver" ? "controller" : "receiver";
    send(room[other], { type: "peer_disconnected" });
    // Limpa sala se os dois saíram
    if (!room.receiver && !room.controller) delete rooms[code];
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Slide Remote rodando na porta ${PORT}`));
