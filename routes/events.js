const { Router } = require('express'); 
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');  
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events'); 


const router = Router(); 


//por cualquier ruta que ejecute 
//primero pasa por este .use() para validar nuestro token
router.use( validarJWT ); 

router.get('/', getEventos);

router.post(
    '/', 
    [
        check('customerID','El customerID es obligatorio').not().isEmpty(),
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','La fecha es obligatoria').custom( isDate ),
        check('end','Fecha del final debe ser obligatoria').custom( isDate ),
        validarCampos
    ]
    , 
    crearEvento);

router.put('/:id',
    [
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','La fecha es obligatoria').custom( isDate ),
    check('end','Fecha del final debe ser obligatoria').custom( isDate ),
    validarCampos
    ],
    actualizarEvento);

router.delete('/:id', eliminarEvento);

module.exports = router; 
