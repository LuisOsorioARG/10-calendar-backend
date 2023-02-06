const { Request, Response } = require('express'); 
const bcrypt = require('bcryptjs'); 
const Usuario = require('../models/Usuario'); 
const Evento = require('../models/Evento'); 

//const { generarJWT } = require('../helpers/jwt'); 

const getEventos = async(req, res = response ) => {
    try {

        const eventos = await Evento.find()
                                    .populate('user','name');  // el populate le agrega los datos de la referencia del usuario   

        res.status(201).json({
            ok:true,
            eventos
        });        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
 
}

const crearEvento = async(req, res = response ) => {

    const evento = new Evento( req.body ); 

    try {

        evento.user = req.uid; 

        const eventoGuardado = await evento.save(); 

        res.status(201).json({
            ok:true,
            evento: eventoGuardado
        });        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
 
}

const actualizarEvento = async(req, res = response ) => {
    try {

        const eventoID = req.params.id;
        const uid = req.uid; 
        
        console.log("usuario ID:",uid);

        const evento = await Evento.findById( eventoID ); 

        if (!evento) {
            res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }

        console.log("usuario ID:",evento.user.toString()); 

        //logica de negocio: no quiero que un usuario edite un evento 
        //que no sea de èl, por eso ahora preguntamos
        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'Usuario no autorizado para cambiar evento'
            });
        }

        //en este punto tengo todo OK para actualizar el evento
        const nuevoEvento = {
            ...req.body,
            user:uid      //agrego el usuario que no viene en el req.body
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoID, nuevoEvento); 

        res.json({
            ok:true,
            evento: eventoActualizado
        });
       
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
 
}

const eliminarEvento = async(req, res = response ) => {
    try {
        res.status(201).json({
            ok:true,
            msg:'actualizarEvento'
        });        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
 
}
module.exports = { 
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}; 