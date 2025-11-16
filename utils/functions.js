
function limpieza(cadena) {

  let newCadena = cadena.replace("'", "");
  newCadena = newCadena.replace("'", "");
  newCadena = newCadena.replace("}", "");
  newCadena = newCadena.trimStart();
  return newCadena;
}

function calculoSubTotal(cantidadX,cantidadxbulto,precioX) {

  let subTotal = 0;
  let cxb = Number(cantidadxbulto);
  let precio  =  Number(precioX);
  let cantidad = Number(cantidadX);
  if ( cxb > 0 ) {
    subTotal = precio / cxb; 
    subTotal = subTotal * cantidad;
  }
  return subTotal; 
}


function completaItem(codigo, cantidad,materias) {

    let newIngredientes = null; 

    for (x=0;x<materias.length;x++) {
      let materialesPlanchados = materias[x].toString(); 

      const materialesPlanchadosLimpio = materialesPlanchados.replace(/\n/g, '');

      let vectorcito = materialesPlanchadosLimpio.split(",");

      const contiene = vectorcito[1].includes("codigo");
      if ( contiene ) {
        
        const numero = vectorcito[1].match(/\d+/)[0];

        if ( numero === codigo ) {

          let vector1 = vectorcito[2].split(':'); 
          let descripcion = limpieza(vector1[1]);

          vector1 = vectorcito[3].split(':'); 
          let precio = limpieza(vector1[1]);

          vector1 = vectorcito[4].split(':'); 
          let cantidadxbulto = limpieza(vector1[1]);

          vector1 = vectorcito[5].split(':'); 
          let unidad = limpieza(vector1[1]);

          subTotal = calculoSubTotal(cantidad,cantidadxbulto,precio);

        newIngredientes = 
            {
              codigo: codigo,
              descripcion: descripcion,
              cantidadRequerida: cantidad,
              precio: precio,
              cantidadxbulto,
              unidad,
              subTotal
            };

          return newIngredientes; 
        }
      }
    }
  return newIngredientes; 
}



// Exportación estilo CommonJS
module.exports = { completaItem };
