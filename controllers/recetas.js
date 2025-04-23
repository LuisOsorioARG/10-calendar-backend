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

    //si lei una receta, ahora tengo 
    //que completar la información de sus elementos
    //con el precio

    const materias = await MateriasPrimas.find();

    if (materias.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: 'No hay materias primas para mostrar'
      });
    }

    console.log("MATERIALES:",materias); 

    const newRecetas = completoIngredientes(recetas[0].ingredientes,materias);

    console.log("MATERIALES de la RECETA COMPLETO:",newRecetas[0]); 

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
