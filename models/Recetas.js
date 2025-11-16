const { Schema, model } = require('mongoose');

const ingredienteSchema = new Schema({
    codigo: {
      type: String,
      required: true
    },
    cantidad: {
      type: String,
      required: true
    }
  });

  const RecetasSchema = new Schema({
    codigo: {
      type: String,
      required: true,
      unique: true
    },
    descripcion: {
      type: String,
      required: true
    },
    rinde: {
      type: String,
      required: true
    },
    tipo: {
      type: String,
      required: false
    },
    tipoReceta: {
      type: String,
      required: false
    },
    ingredientes: {
      type: [ingredienteSchema],
      required: true
    }
  });  

/*
esto cambia el valor de los campos del json
*/
RecetasSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Recetas', RecetasSchema );

