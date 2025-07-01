const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const path = require('path');

app.use(express.static(path.join(__dirname, 'front', ))); // Sirve quickbot.html y archivos estáticos

const client = new Client();

client.on('qr', qr => {
    io.emit('qr', qr); // Envía el QR al frontend
    qrcode.generate(qr, { small: true }); // Opcional: sigue mostrando en consola
});

client.on('ready', () => {
    console.log('Bot listo y conectado!');
});

client.on('message', message => {
    const msg = message.body.toLowerCase();

    if (msg.includes("hola")){
        message.reply("👋 ¡Hola! Bienvenido a *BotTech*.\nEscribe:\n1️⃣ Menú\n2️⃣ Hacer pedido\n3️⃣ Ubicación\n4️⃣ Hablar con atención")
    }

    if (msg === "1"){
        message.reply("📋 Menú:\n- Café: S/5\n- Té: S/4\n- Sándwich: S/6")
    }

    if (msg === "2"){
        message.reply("📍Nos encontramos en Av. Lima 123, frente a Plaza Lima Sur.")
    }

    if (msg === "3") {
        message.reply("💬 Un asesor te responderá en breve.")
    }
});

client.initialize();

server.listen(3000, () => {
    console.log('Servidor web en http://localhost:3000');
});