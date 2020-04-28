'user strict'

var express = require('express');
var bodyParser = require('body-parser');
//carga frame
var app = express();

//cargar rutas
var user_routes = require ('./routers/user');
var follow_routes = require('./routers/follow');

//carrgar middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cors

//rutas
app.use ('/api', user_routes); //middleware
app.use ('/api', follow_routes);


//exportar
module.exports = app;
