const express = require('express');

// INICIALIZAMOS API CON EXPRESS

const app = express();
const puerto = 8080;
const server = app.listen(puerto, () =>
    console.log('Server up en puerto', puerto));

server.on('error', (err) => {
    console.log('ERROR ATAJADO', err);
});