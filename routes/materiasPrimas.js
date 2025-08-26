const { Router } = require('express'); 
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');  
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMateriasPrimas,actualizarMateriaPrima} = require('../controllers/materiasPrimas');

const router = Router(); 


//por cualquier ruta que ejecute 
//primero pasa por este .use() para validar nuestro token
router.use( validarJWT ); 

router.get('/', getMateriasPrimas);

router.put('/:id',
    [
    check('descripcion','La descripción es obligatoria').not().isEmpty(),
    check('precio','El precio es obligatorio').not().isEmpty(),
    validarCampos
    ],
    actualizarMateriaPrima);


module.exports = router; 
