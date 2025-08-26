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
        ingredientes: resultado,

        }
    );
      /*
      for (t=0;t<ingredientes.length;t++) {
        let codigo = ingredientes[t].codigo.toString(); 
        let cantidad = ingredientes[t].cantidad.toString(); 
        console.log("INGREDIENTES - CODIGO:",codigo); 

        for (x=0;x<materias.length;x++) {
          let materialesPlanchados = materias[x].toString(); 
          console.log("MATERIASPLANCHADA:",materialesPlanchados); 

          const materialesPlanchadosLimpio = materialesPlanchados.replace(/\n/g, '');
          console.log("MATERIASPLANCHADA2:",materialesPlanchadosLimpio);

          let vectorcito = materialesPlanchadosLimpio.split(",");
          console.log("MATERIASPLANCHADA:",vectorcito[1]); 

          //vemos lo que tenemos e
          const contiene = vectorcito[1].includes("codigo");
          if ( contiene ) {
            const numero = vectorcito[1].match(/\d+/)[0];
            console.log("ENCONTRADO!!!:",numero); 

            if ( numero === codigo ) {
              console.log("ENCONTRADO x numero!!!:",numero); 
              console.log("ENCONTRADO x codigo!!!:",codigo); 

              let vector1 = vectorcito[2].split(':'); 
              let descripcion = vector1[1];
              console.log("ENCONTRADO x codigo!!!:",descripcion); 

              vector1 = vectorcito[3].split(':'); 
              let precio = vector1[1];
              console.log("ENCONTRADO x precio!!!:",precio); 

              vector1 = vectorcito[4].split(':'); 
              let cantidadxbulto = vector1[1];
              console.log("ENCONTRADO x cantidadxbulto!!!:",cantidadxbulto); 

              vector1 = vectorcito[5].split(':'); 
              let unidad = vector1[1];
              console.log("ENCONTRADO x unidad!!!:",unidad); 

              newIngredientes.push(
                {
                  codigo: codigo,
                  descripcion: descripcion,
                  cantidadRequerida: cantidad,
                  precio: precio,
                  cantidadxbulto,
                  unidad
                }
              )

            }
          }

        }

      } */

      
    }
  
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
