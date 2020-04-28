'use strict'
var bcrypt = require ('bcrypt-nodejs'); 
var mongoosePaginate = require ('mongoose-pagination');
var fs= require('fs');
var path = require('path');

//modelo de usuarios
var User = require('../models/user');
var follow = require ('../models/follow');
var Publication = require('../models/publication');
var jwt = require('../services/jwt');

//MÉTODO PRUEBA
function home(req, res){
    res.status(200).send({
        message:'Hola Soy Tu Amiga La Tortuga, desde el servidor de NodeJS'

    });
}
function pruebas(req, res){
    console.log (req.body);
    res.status(200).send({
        message:'Acción de pruebas en el servidor de NodeJS'

    });
}
//REGISTRO
function saveUser(req,res){
    var params = req.body;
    var user= new User();

    if(params.name && params.surname && params.nick && params.email && params.password){

        user.name = params.name;
        user.surname = params.surname;
        user.nick = params.nick;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;

//controlar usuarios duplicados
        User.find({ $or: [ //busca todos los registros
            {email: user.email.toLowerCase()},
            {nick: user.nick.toLowerCase()}
            ]}) .exec((err, users)=>{
                if(err) return res.status(500).send({message:'Error en la petidición de usuarios'});

                if(users && users.length >=1){
                    return res.status(200).send({message: 'El usuario ya existe'});
                } else {
       //cifra pass y guarda datos
       bcrypt.hash (params.password, null, null, (err, hash)=>{
        user.password = hash;

        user.save((err, userStored)=>{
            if (err) return res.status (500).send ({message: 'Error al guardar el usuario'});

            if (userStored){
                res.status(200).send({user: userStored});
            } else {
                res.status(404).send({message: 'No se ha registrado usuario'});
            }
        });

    });
                }
            });
        
    } else {
        res.status(200).send({
            message: 'Ingresa todos los campos'
        });
    }
}
//LOGIN
function loginUser(req, res){
    var params = req.body;

    var email= params.email;
    var password = params.password;

    User.findOne({email: email }, (err, user)=>{

        if(err) return res.status(500).send({message:'Error en la petición'});

        if(user){
            bcrypt.compare(password, user.password, (err, check)=>{
                if(check){
                                  
                    if(params.gettoken){
       //devolver token y generar token
       return res.status(200).send({
           token: jwt.createToken(user)
       });
                    }else{
                   //devolver datos de usuario
                    }
                    user.password = undefined;
                    return res.status(200).send({user})

                } else{
                    return res.status(404).send({message:'El usuario no se puede identificar'});
                }
            });
        } else {
            return res.status(404).send({message:'El usuario no se puede identificar!!!'}); 
        }

    });
}

//conseguir datos de usuario
function getUser(req,res){
    var userId = req.params.id;
    var userId=req.body;

    //borrar propiedad pass
    delete update.password;

    if(userId !=req.user.sub){
        return res.status(500).send({message:'No tiene permiso para actualizar datos'})
    }

    User.findById(userId, (err, user )=>{
        if (err) return res.status(500).send({message: 'Error en la petición'});

        if(!user) return res.status(404).send({message: 'El susuario no existe'});

        return res.status(200).send({user});
    });
}

//devolver listado de usuario paginado
function getUsers(req, res){
    var identity_user_id = req.user.sub;

    var page=1;
    if(req.params.page){
        page = req.params.page;
    }

    var itemsPerPage =5;

    User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total)=>{
        if(err) return res.status(500).send({message: 'Error en la petición'});

        if(!users) return res.status(404).send({message:'No hay usuarios disponibles'});

        return res.status (200).send({
            users,
            total,
            pages: Math.ceil(total/itemsPerPage),
        });

    });

}
//edicion d datos de usuario
function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;
    
//borrar propiedad passw
    delete update.password;

    if(userId != req.user.sub){
        return res.status(500).send({message:'Acceso denegado para actualizar datos de usuario'});
    }
    User.findOne({ $or: [ 
        {email: update.email.toLowerCase()},
        {nick: update.nick.toLowerCase()}
        ]}).exec((err,users)=>{
            console.log(users);

            var user_isset =false;
            users.forEach((user) => {
                if(user && user._id != userId) user_isset = true ;   
            
            });

            if(user_isset) return res.status(404).send({message:'Los datos ya estan en uso'});

            User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated)=>{
                if(err) return res.status(500).send({message: 'Error en la petición'});
        
                if(!userUpdated) return res.status(404).send({message:'No se puede actualizar el usuario'});
        
                return res.status(200).send({user: userUpdated});
        });
    });
}

//subir archivos de IMAGEN /avatar usuario
function uploadImage(req, res){
    var userId = req.params.id;

    if(req.files){
        var file_path = req.files.image.path;
        console.log(file_path);
        var file_split = file_path.split('\\');
        console.log(file_split);

        var file_name =  file_split [2];
        console.log(file_name);

    var ext_split = file_name.split('\.');
    console.log(ext_split);

    var file_ext = ext_spllit [1];
    console.log(file_ext);

    if(userId != req.user.sub){
       return removeFilesOfUploads(res, file_path,'No tiene permiso para actualizar los datos del usuario');
    }

    if(file_ext == 'png'|| file_ext == 'jpg'||file_ext||'jpeg'|| file_ext == 'gif'){
        
 //actualizar documento de usuario logueado
        User.findByIdAndUpdate(userId, {image: file_name}, {new:true}, (err, userUpdated)=>{

            if(err) return res.status(500).send({message: 'Error en la petición'});

            if(!userUpdated) return res.status(404).send({message:'No se puede actualizar el usuario'});
    
            return res.status(200).send({user: userUpdated});

        });

    }else{
       return removeFilesOfUploads(res, file_path,'Extensiòn no valida');

    }

    }else{
        return res.status(200).send({message:'No se han subido imagenes'});
    }
}

function removeFilesOfUploads(res, file_path, message){
    fs.unlink(file_path, (err)=>{
        return res.status(200).send({message:message});
    });

}

//
function getImageFile(req, res){
    var image_file = req.params.imageFile;

    var path_file = './uploads/users/'+ image_file;

    fs.exists(path_file,(exists)=>{
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200). send({message: 'No existe la imagen...'});
        }
    });
}


module.exports = {
    home,
    pruebas,
    saveUser,
    loginUser,
    getUser,
    getUsers,
    updateUser,
    uploadImage,
    getImageFile
}