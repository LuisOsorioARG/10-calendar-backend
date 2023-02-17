const { Request, Response } = require('express'); 
const bcrypt = require('bcryptjs'); 
const Usuario = require('../models/Usuario'); 
const Evento = require('../models/Evento'); 
const Customer = require('../models/Customer'); 

//const { generarJWT } = require('../helpers/jwt'); 

const getCustomer = async(req, res = response ) => {
    try {

        console.log("Estoy por GetCustomer!!!"); 
        /*
        const eventos = await Evento.find()
                                    .populate('user','name');  // el populate le agrega los datos de la referencia del usuario   

        */
        res.status(200).json({
            ok:true,
            msg: 'get-customer OK'
        });        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
 
}

const crearCustomer = async(req, res = response ) => {

    const customer = new Customer( req.body ); 

    try {

        //customer.user = req.uid; 

        const eventoGuardado = await customer.save(); 

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

const actualizarCustomer = async(req, res = response ) => {
    try {
        const eventoID = req.params.id;
        const uid = req.uid; 

        const evento = await Evento.findById( eventoID ); 

        if (!evento) {
            res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }

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

const eliminarCustomer = async(req, res = response ) => {
    try {
        const eventoID = req.params.id;
        const uid = req.uid; 

        const evento = await Evento.findById( eventoID ); 

        if (!evento) {
            res.status(404).json({
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
    getCustomer,
    crearCustomer,
    actualizarCustomer,
    eliminarCustomer
}; 