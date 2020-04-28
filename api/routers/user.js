//configuracion de rutas de controlador de usuario
'use strict'

var express = require('express');
var userController = require('../controllers/user');
//acceso a metodos get
var api = express.Router();
var md_auth = require('../middlewares/autentificacion');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'})

api.get('/home', userController.home);
api.get('/pruebas', md_auth.ensureAuth, userController.pruebas);
api.post('/registro', userController.saveUser);
api.post('/login', userController.loginUser);
api.get('/user/:id', md_auth.ensureAuth, userController.getUser);
api.get('/users/:page?', md_auth.ensureAuth, userController.getUsers);
api.put('/update-user/:id', md_auth.ensureAuth, userController.updateUser);
api.post('/upload-Image-user/:id', [md_auth.ensureAuth, md_upload], userController.uploadImage);
api.get('/get-image-user/:imageFile', md_auth.ensureAuth, userController.getImageFile);

module.exports = api;
 