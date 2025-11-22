const { Schema, model } = require('mongoose');

const MateriasPrimasSchema = Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: String,
        required: true,
    },
    cantidadxbulto: {
        type: String,
        required: true,
    },
    unidad: {
        type: String,
        required: true,
    },
    update: {
        type: String,
        required: false,
    },
});

//esto cambia el valor de los campos del json
MateriasPrimasSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});



module.exports = model('materiasPrimas', MateriasPrimasSchema );

