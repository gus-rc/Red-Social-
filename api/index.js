'use strict'

//cargar libreria moongose
var mongoose = require('mongoose');
var app = require ('./app');
var port = 3800;

//conexion BD
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/curso_mean_social') //no se usa usuario de db porque no se genero al crearla

.then(()=> {
    console.log("*******************************************************************************************")
    console.log("*                                                                                          *")
    console.log("*    La conexión a la base de datos curso_mean_social se ha realizado correctamente        *");
    console.log("*                                                                                          *")
    console.log("********************************************************************************************")

    //crear servidor
    app.listen(port, () =>{
        console.log("\n\n\nservidor corriendo en http://localhost:3800");

    });
})
.catch(err => console.log(err));

