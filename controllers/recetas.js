const { response } = require('express');
const Recetas = require('../models/Recetas');
const MateriasPrimas = require('../models/MateriasPrimas'); 
const { completaItem } = require('../utils/functions');

const getRecetas = async (req, res = response) => {
  try {
    const recetas = await Recetas.find();

    if (recetas.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: 'No hay recetas para mostrar'
      });
    }

    const materias = await MateriasPrimas.find();

    if (materias.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: 'No hay materias primas para mostrar'
      });
    }

    // PASO 1 En recetas[i].ingredientes[0].codigo tenemos en numerico el valor del codigo
    let ingredientes = [];
    let recetasNew = []; 
    
    // barro las recetas...
    for (i=0;i<recetas.length;i++) {

      let resultado = [];


      ingredientes = recetas[i].ingredientes;

      // barro los ingredientes de esta receta
      for (t=0;t<ingredientes.length;t++) {
        resultado.push( completaItem(ingredientes[t].codigo,ingredientes[t].cantidad,materias)); 
      }

      recetasNew.push({
        id: recetas[i]._id,
        codigo: recetas[i].codigo,
        descripcion: recetas[i].descripcion,
        rinde: recetas[i].rinde,
        tipo: recetas[i].tipo,
        tipoReceta: recetas[i].tipoReceta,
        ingredientes: resultado,
        }
    );
    }
  
    return res.status(200).json({
      ok: true,
      recetasNew
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error inesperado, hable con el administrador'
    });
  }
};

const crearReceta = async(req, res = response ) => {

    const codigo = req.body.codigo; 

    let receta = await Recetas.findOne({ codigo });

    if ( receta ) {
        return res.status(400).json({
            ok: false,
            msg: 'Ya existe una receta con ese código:' + receta.descripcion.toString()
            });
    }

    receta = new Recetas( req.body ); 

    try {

        const recetaGuardada = await receta.save(); 

        return res.status(201).json({
            ok:true,
            receta: recetaGuardada
        });        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
 
}

const eliminarReceta = async(req, res = response ) => {
    try {
    
        const _id = req.params.id;

        const uid = req.uid; 

        let receta = await Recetas.findById( _id ); 

        if (!receta) {
            return res.status(404).json({
                ok:false,
                msg:'Receta no existe por ese codigo'
            })
        }

        const recetaEliminada = await Recetas.findByIdAndDelete( _id ); 

        res.json({
            ok:true,
            receta: recetaEliminada
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
  getRecetas,
  crearReceta,
  eliminarReceta
};
