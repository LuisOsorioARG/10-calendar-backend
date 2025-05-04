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

const actualizarMateriaPrima = async(req, res = response ) => {
  try {

      const materiaID = req.params.id;

      console.log("Materias Primas: PASO 1 ",materiaID);

      const uid = req.uid; 

      const materiasPrimas = await MateriasPrimas.findById( materiaID ); 

      console.log("Materias Primas: PASO 2 ");

      if (!materiasPrimas) {
          return res.status(404).json({
              ok:false,
              msg:'Materia primera no existe por ese codigo'
          })
      }

      //logica de negocio: no quiero que un usuario edite un evento 
      //que no sea de èl, por eso ahora preguntamos
      /*
      if ( evento.user.toString() !== uid ) {
          return res.status(401).json({
              ok: false,
              msg: 'Usuario no autorizado para cambiar evento'
          });
      }
      */

      //en este punto tengo todo OK para actualizar el evento
      const materiasPrimasNueva = {
          ...req.body,
          user:uid      //agrego el usuario que no viene en el req.body
      }

      //el new: true es para que me traiga el evento actualizado en la 
      //respueta, sino trae el viejo evento (como estaba antes de ser 
      //actualizado)
      const materiasPrimasActualizado = await MateriasPrimas.findByIdAndUpdate( materiaID, materiasPrimasNueva, { new: true }); 

      res.json({
          ok:true,
          materiaPrima: materiasPrimasActualizado
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
  getMateriasPrimas,
  actualizarMateriaPrima
};
