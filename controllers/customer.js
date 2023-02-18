const { Request, Response } = require('express'); 
const bcrypt = require('bcryptjs'); 
const Usuario = require('../models/Usuario'); 
const Evento = require('../models/Evento'); 
const Customer = require('../models/Customer'); 

//const { generarJWT } = require('../helpers/jwt'); 



const getCustomer = async(req, res = response ) => {
    try {

        //busca todos los clientes...
        let customer = await Customer.find();

        if ( !customer ) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay clientes para mostrar'
                });
        }

        return res.status(200).json({
            ok:true,
            msg: 'El cliente exite',
            customer
        });        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
 
}

const getCustomerbyId = async(req, res = response ) => {
    try {

        const phone = "0343-0909125"; 

        /*
        const eventos = await Evento.find()
                                    .populate('user','name');  // el populate le agrega los datos de la referencia del usuario   

        */

        let customer = await Customer.findOne({ phone });

        if ( !customer ) {
            return res.status(400).json({
                ok: false,
                msg: 'El cliente no existe'
                });
        }

        return res.status(200).json({
            ok:true,
            msg: 'El cliente exite',
            customer
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

    const { phone } = req.body; 

    let customer = await Customer.findOne({ phone });

    if ( customer ) {
        return res.status(400).json({
            ok: false,
            msg: 'El cliente ya existe'
            });
    }

    customer = new Customer( req.body ); 

    try {

        const eventoGuardado = await customer.save(); 

        return res.status(201).json({
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
    getCustomer,
    crearCustomer,
    actualizarCustomer,
    eliminarCustomer
}; 