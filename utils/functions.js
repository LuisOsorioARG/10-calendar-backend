
const completoIngredientes = (vector1, vector2) => {

  let vectorSalida = [];

  for (let t = 0; t < vector1.length; t++) {

    let codigo = vector1[t].codigo;
    let codigoX = codigo.toString();

    console.log("VECTOR2_0:", codigoX);

    for (let i = 0; i < vector2.length; i++) {
      const elem = vector2[i];

    
      const objPlanchado = JSON.stringify({
        ...elem,
        _id: elem._id.toString()
      }, null, 2);

      const { codigo } = elem;
      console.log("VECTOR2_1:", elem._doc);
      console.log("VECTOR2_2:", elem._doc.codigo);
      console.log("VECTOR2_2:", elem._doc.descripcion);
      console.log("VECTOR2_2:", elem._doc.precio);
      console.log("VECTOR2_2:", elem._doc.unidad);
      console.log("VECTOR2_2:", elem._doc.cantidadxbulto);
      
      if ( elem._doc.codigo === codigoX) {
        console.log("VECTOR2_2:ENCONTRADO EL:",codigoX);
      } else {
        console.log("VECTOR2_2:NO ENCONTRADO EL 8");
      }
    }
  }

  // Combinamos la info del mapa con los datos de vector1


  return vectorSalida;
};


// Exportación estilo CommonJS
module.exports = { completoIngredientes };
