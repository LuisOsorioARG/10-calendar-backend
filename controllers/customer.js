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
            msg: 'El cliente existe',
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

    const phone = req.body.phone; 
    const phone3 = { phone }; 

    let customer = await Customer.findOne(phone3);

    if ( customer ) {
        return res.status(400).json({
            ok: false,
            msg: 'Ya existe un cliente con ese celular'
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

        const uid = req.uid; 

        const customerID = req.params.id;
        const customerID3 = { _id: customerID }; 

        console.log("---customerID3---------------------------Tipo de UI:",customerID3); 

        let customer = await Customer.findById( customerID3 ); 

        if (!customer) {
            return res.status(404).json({
                ok:false,
                msg:'No existe cliente con ese id'
            })
        }

        const phone = req.body.phone; 
        const phone3 = { phone }; 
    
        let customerAuxiliar = await Customer.findOne(phone3);
    
        /*
        if ( customerAuxiliar === customer) {
            console.log("------------------------------SON IGUALES!!! -------"); 

        }
        */

        if ( customerAuxiliar ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un cliente con ese celular'
                });
        }


        //en este punto tengo todo OK para actualizar el evento
        const nuevoCustomer = {
            ...req.body,
            user:uid      //agrego el usuario que no viene en el req.body
        }

        const customerActualizado = await Evento.findByIdAndUpdate( customerID3, nuevoCustomer, { new: true }); 

        res.json({
            ok:true,
            evento: customerActualizado
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
        const customerID = req.params.id;
        const uid = req.uid; 

        const evento = await Evento.findById( customerID ); 

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
                msg: 'Usuario no autorizado para eliminar este evento'
            });
        }
        */


        /* FALTA QUE NO SE PUEDA CUSTOMER SI TIENE EVENTOS/FICHAS ASOCIADAS AL EL */

        const eventoEliminado = await Evento.findByIdAndDelete( customerID ); 

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