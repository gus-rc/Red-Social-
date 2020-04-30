'user strict'

var express = require('express');
var bodyParser = require('body-parser');
//carga frame
var app = express();

//cargar rutas
var user_routes = require ('./routers/user');  //validar mas adelante que el nombre de la carpeta no afecte, se deberia llamar routes,
var follow_routes = require('./routers/follow');

//carrgar middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cors

//rutas
/* ruta de prueba 
app.get('/pruebas', (req, res) => {
	//console.log(req.body);
	res.status(200).send({
		message: 'Acción de pruebas en el servidor de Nodejs'
	});
});
*/
app.use('/api', user_routes); //middleware
app.use('/api', follow_routes);


//exportar
module.exports = app;
