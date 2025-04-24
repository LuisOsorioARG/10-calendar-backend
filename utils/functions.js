
function completaItem(codigo, cantidad,materias) {

    let newIngredientes = null; 

//    console.log("INGREDIENTES - CODIGO:",codigo); 
    
    for (x=0;x<materias.length;x++) {
      let materialesPlanchados = materias[x].toString(); 
  //    console.log("MATERIASPLANCHADA:",materialesPlanchados); 

      const materialesPlanchadosLimpio = materialesPlanchados.replace(/\n/g, '');
    //  console.log("MATERIASPLANCHADA2:",materialesPlanchadosLimpio);

      let vectorcito = materialesPlanchadosLimpio.split(",");
    //  console.log("MATERIASPLANCHADA:",vectorcito[1]); 

      //vemos lo que tenemos e
      const contiene = vectorcito[1].includes("codigo");
      if ( contiene ) {
        const numero = vectorcito[1].match(/\d+/)[0];
      //  console.log("ENCONTRADO!!!:",numero); 

        if ( numero === codigo ) {
        //  console.log("ENCONTRADO x numero!!!:",numero); 
        //  console.log("ENCONTRADO x codigo!!!:",codigo); 

          let vector1 = vectorcito[2].split(':'); 
          let descripcion = vector1[1];
        //  console.log("ENCONTRADO x codigo!!!:",descripcion); 

          vector1 = vectorcito[3].split(':'); 
          let precio = vector1[1];
        //  console.log("ENCONTRADO x precio!!!:",precio); 

          vector1 = vectorcito[4].split(':'); 
          let cantidadxbulto = vector1[1];
        //  console.log("ENCONTRADO x cantidadxbulto!!!:",cantidadxbulto); 

          vector1 = vectorcito[5].split(':'); 
          let unidad = vector1[1];
        //  console.log("ENCONTRADO x unidad!!!:",unidad); 

        newIngredientes = 
            {
              codigo: codigo,
              descripcion: descripcion,
              cantidadRequerida: cantidad,
              precio: precio,
              cantidadxbulto,
              unidad
            };

          return newIngredientes; 
        }
      }
    }

  console.log("NO ENCONTRAMOS ELEMENTO PARA ESTE CODIGO",codigo); 
  return newIngredientes; 
}



// Exportación estilo CommonJS
module.exports = { completaItem };
