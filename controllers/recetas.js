const { response } = require('express');
const Recetas = require('../models/Recetas');

const getRecetas = async (req, res = response) => {
  try {
    const recetas = await Recetas.find();

    if (recetas.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: 'No hay recetas para mostrar'
      });
    }

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
