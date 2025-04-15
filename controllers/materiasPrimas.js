const { response } = require('express');
const MateriasPrimas = require('../models/MateriasPrimas');

const getMateriasPrimas = async (req, res = response) => {
  try {
    const materias = await MateriasPrimas.find();

    if (materias.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: 'No hay materias primas para mostrar'
      });
    }

    return res.status(200).json({
      ok: true,
      materias
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
  getMateriasPrimas
};
