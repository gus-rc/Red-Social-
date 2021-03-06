'use strict'

var express = require ('express');
var followController = require ('../controllers/follow');
var api = express.Router();
var md_auth = require('../middlewares/autentificacion');

api.post('/follow', md_auth.ensureAuth, followController.saveFollow);
api.delete('/follow/:id', md_auth.ensureAuth,followController.deleteFollow);

module.exports = api; 

