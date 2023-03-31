const { Request, Response } = require('express'); 
const bcrypt = require('bcryptjs'); 
const Usuario = require('../models/Usuario'); 
const Evento = require('../models/Evento'); 

//const { generarJWT } = require('../helpers/jwt'); 

const getEventos = async(req, res = response ) => {
    try {

        const eventos = await Evento.find()
                                    .populate('user','name');  
        
        /* el populate le agrega los datos de la referencia del usuario   
           es importante destacar que user es una referencia que colocamos
           en el registro del evento y que name es uno de los campos
           que queremos traer de esa referencia. 
           el populate trae la referencia que tenga nuestro registro
           a otra coleccion que tenga nuestra base de datos.
        */
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

        const evento = await Evento.findById( eventoID ); 

        if (!evento) {
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }

        //logica de negocio: no quiero que un usuario edite un evento 
        //que no sea de èl, por eso ahora preguntamos
        /*
        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'Usuario no autorizado para cambiar evento'
            });
        }
        */

        //en este punto tengo todo OK para actualizar el evento
        const nuevoEvento = {
            ...req.body,
            user:uid      //agrego el usuario que no viene en el req.body
        }

        //el new: true es para que me traiga el evento actualizado en la 
        //respueta, sino trae el viejo evento (como estaba antes de ser 
        //actualizado)
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoID, nuevoEvento, { new: true }); 

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
        const eventoID = req.params.id;
        const uid = req.uid; 

        const evento = await Evento.findById( eventoID ); 

        if (!evento) {
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }

        //logica de negocio: no quiero que un usuario edite un evento 
        //que no sea de èl, por eso ahora preguntamos
        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'Usuario no autorizado para eliminar este evento'
            });
        }

        const eventoEliminado = await Evento.findByIdAndDelete( eventoID ); 

        res.json({
            ok:true,
            evento: eventoEliminado
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