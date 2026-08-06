const { Router } = require('express'); 
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');  
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getRecetas, crearReceta, eliminarReceta } = require('../controllers/recetas');
const { actualizarRecetaMateriales } = require('../controllers/recetasMateriales');

const router = Router(); 

console.log('CARGANDO ROUTER RECETAS');

//por cualquier ruta que ejecute 
//primero pasa por este .use() para validar nuestro token
//router.use( validarJWT ); 

router.get('/', getRecetas);

router.delete('/xeliminar/:id', (req,res)=>{
    res.json({ ok:true });
    });

router.delete('/eliminar/:id', eliminarReceta);

router.post(
    '/new', 
    [
        check('codigo','El código es obligatorio').not().isEmpty(),
        check('descripcion','La descripción es obligatoria').not().isEmpty(),
        validarCampos
    ]
    , 
    crearReceta);

router.put('/:id', actualizarRecetaMateriales);


module.exports = router; 
