const { Request, Response } = require('express'); 
const bcrypt = require('bcryptjs'); 
const Usuario = require('../models/Usuario'); 
//const { generarJWT } = require('../helpers/jwt'); 

const getEventos = async(req, res = response ) => {
    try {
        res.status(201).json({
            ok:true,
            msg:'getEventos'
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
    try {
        res.status(201).json({
            ok:true,
            msg:'crearEvento'
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

        console.log(req.params);

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