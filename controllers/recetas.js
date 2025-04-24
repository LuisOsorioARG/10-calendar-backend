const { response } = require('express');
const Recetas = require('../models/Recetas');
const MateriasPrimas = require('../models/MateriasPrimas'); 
const { completoIngredientes } = require('../utils/functions');

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
    let newIngredientes = [];
    for (i=0;i<recetas.length;i++) {
      console.log("RECETAS:",recetas[i].ingredientes[0].codigo); 
      console.log("RECETAS:",recetas[i].ingredientes[0].cantidad); 
      newIngredientes.push(
        {
          codigo: '1',
          descripcion: 'bola',
          precio: '234'
        }
      )
    }

    console.log("RECETASNEW:",newIngredientes[0]); 
    
    /*
    for (i=0;i<materias.length;i++) {
      console.log("MATERIA1:",materias[i]); 
      let codigo = materias[i].toString();
      console.log("MATERIA2:",codigo); 
      let vectorcito = codigo.split(',');
      for (t=0;t<vectorcito.length;t++) {
        console.log("MATERIA3:",vectorcito[t]); 
      }
    }
      */

    //const newRecetas = completoIngredientes(recetas[0].ingredientes,materias);

    //console.log("MATERIALES de la RECETA COMPLETO:",newRecetas[0]); 

    return res.status(200).json({
      ok: true,
      recetas
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
