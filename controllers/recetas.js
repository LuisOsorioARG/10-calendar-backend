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

module.exports = {
  getRecetas
};
