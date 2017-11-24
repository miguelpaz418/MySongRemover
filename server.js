// crear el servidor en Express
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

// crear la app de express
const app = express();


// Archivo del API que intectactua con MongoDB
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));


// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API localizacion
app.use('/api', api);

// Enviar todas las solicitudes a la aplicacion de Angular
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// configuracion del puerto 8888
const port = process.env.PORT || '8888';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, ()=> console.log('corriendo en localhost:${ port }'));


