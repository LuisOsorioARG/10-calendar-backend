const { response } = require('express');
const Recetas = require('../models/Recetas');
const MateriasPrimas = require('../models/MateriasPrimas'); 
const { completaItem } = require('../utils/functions');

const actualizarRecetaMateriales = async(req, res = response ) => {
    try {

        const uid = req.uid; 
        const recetaID = req.params.id;
        const recetas = await Recetas.findById( recetaID ); 
        if (!recetas) {
            return res.status(404).json({
                ok:false,
                msg:'No existe receta con ese id'
            })
        }

        const recetaActualizada = await Recetas.findByIdAndUpdate( recetaID, req.body, { new: true }); 

        res.json({
            ok:true,
            receta:recetaActualizada
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
  actualizarRecetaMateriales
};
