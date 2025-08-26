const { Router } = require('express'); 
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');  
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getRecetas } = require('../controllers/recetas');
const { actualizarRecetaMateriales } = require('../controllers/recetasMateriales');

const router = Router(); 


//por cualquier ruta que ejecute 
//primero pasa por este .use() para validar nuestro token
router.use( validarJWT ); 

router.get('/', getRecetas);

router.put('/:id', actualizarRecetaMateriales);

module.exports = router; 
