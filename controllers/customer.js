const { Request, Response } = require('express'); 
const bcrypt = require('bcryptjs'); 
const Usuario = require('../models/Usuario'); 
const Customer = require('../models/Customer'); 


const getCustomers = async(req, res = response ) => {
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


const crearCustomer = async(req, res = response ) => {

    const phone = req.body.phone; 
    const phone3 = { phone }; 

    let customer = await Customer.findOne(phone3);

    if ( customer ) {
        return res.status(400).json({
            ok: false,
            msg: 'Ya existe un cliente con ese celular:' + customer.name.toString()
            });
    }

    customer = new Customer( req.body ); 

    try {

        const customerGuardado = await customer.save(); 

        return res.status(201).json({
            ok:true,
            customer: customerGuardado
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

        let customer = await Customer.findById( customerID3 ); 

        if (!customer) {
            return res.status(404).json({
                ok:false,
                msg:'No existe cliente con ese id'
            })
        }
    
        // CONTROL 2 vemos si hay clientes con ese mismo CELULAR -------
        
        const phone = req.body.phone; 
        const phone3 = { phone }; 
    
        customer = await Customer.findOne(phone3);
    
        let celularEnOtroCliente = false;
        if ( customer ) {
            let CustomerExistenteID = customer._id.toString();
            if ( CustomerExistenteID !== customerID )
                celularEnOtroCliente = true;
        }

        if ( customer && celularEnOtroCliente ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un cliente con ese celular:' + customer.name.toString()
                });
        }

        //en este punto tengo todo OK para actualizar el customer
        const nuevoCustomer = {
            ...req.body,
            user:uid      //agrego el usuario que no viene en el req.body
        }

        const customerActualizado = await Customer.findByIdAndUpdate( customerID3, nuevoCustomer, { new: true }); 

        res.json({
            ok:true,
            customer: customerActualizado
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
        const customerID3 = { _id: customerID }; 
        const uid = req.uid; 

        let customer = await Customer.findById( customerID3 ); 

        if (!customer) {
            return res.status(404).json({
                ok:false,
                msg:'Cliente no existe por ese id'
            })
        }

        /* FALTA QUE NO SE PUEDA CUSTOMER SI TIENE customerS/FICHAS ASOCIADAS AL EL */
        /* ESO LO PUEDO VALIDAR X EL FRONT */

        const customerEliminado = await Customer.findByIdAndDelete( customerID ); 

        res.json({
            ok:true,
            customer: customerEliminado
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
    getCustomers,
    crearCustomer,
    actualizarCustomer,
    eliminarCustomer
}; 