const express = require('express');
const app = express();

let send = require('../controlers/email.controler'); // Mandalos la ruta del controlador 

app.post('/send',send.sendEmail); // Le decimos que ejecute la funcion

module.exports = app; // Exportamos la app