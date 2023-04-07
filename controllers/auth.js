const { Request, Response } = require('express'); 
const bcrypt = require('bcryptjs'); 
const Usuario = require('../models/Usuario'); 
const { generarJWT } = require('../helpers/jwt'); 

const crearUsuario = async(req, res = response ) => {


    try {
        const { name, password, email } = req.body; 

        let usuario = await Usuario.findOne({ email });

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }


        usuario = new Usuario( req.body ); 

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);  

        //generamos el token 
        const token = await generarJWT( usuario.id, usuario.name );

        await usuario.save(); 
        res.status(201).json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            token
        });        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
 
}

const loginUusuario = async(req,res) => {

    const { password, email } = req.body; 

    try {
        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese mail'
            });
        }

        //en este punto el usuario ya existe y verificamos la contraseña
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'La password es incorrecta'
            });
        }

        //generamos el token 
        const token = await generarJWT( usuario.id, usuario.name );


        //en este punto el usuario existe y su password es correcta
        return res.status(201).json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            token
        });   

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
        
    }


    res.json({
        ok:true,
        msg:'login Usuario'
    }); 
}

const revalidarToken = async(req,res) => {


    const uid = req.uid;
    const name = req.name; 

    //si es valido, pero esta vencido generamos un nuevo
    const token = await generarJWT( uid, name );    

    res.json({
        ok:true,
        msg:'re-validar token',
        uid: uid,
        name: name,
        token
    }); 
}

module.exports = { 
    crearUsuario,
    loginUusuario,
    revalidarToken 
}; 