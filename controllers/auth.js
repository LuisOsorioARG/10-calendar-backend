
const { Request, Response } = require('express'); 

const crearUsuario = (req, res = response ) => {

    console.log("Lo que viene en req:", req.body); 

    res.json({
        ok:true,
        msg:'registro'
    }); 
}

const loginUusuario = (req,res) => {
    res.json({
        ok:true,
        msg:'login Usuario'
    }); 
}

const revalidarToken = (req,res) => {
    res.json({
        ok:true,
        msg:'re-validar token'
    }); 
}

module.exports = { 
    crearUsuario,
    loginUusuario,
    revalidarToken 
}; 