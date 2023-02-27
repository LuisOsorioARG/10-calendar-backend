const { Router } = require('express'); 
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');  
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getCustomer, crearCustomer, actualizarCustomer, eliminarCustomer } = require('../controllers/customer'); 


const router = Router(); 


//por cualquier ruta que ejecute 
//primero pasa por este .use() para validar nuestro token
router.use( validarJWT ); 

router.get('/', getCustomer);

router.post(
    '/', 
    [
        //check('title','El titulo es obligatorio').not().isEmpty(),
        //check('start','La fecha es obligatoria').custom( isDate ),
        //check('end','Fecha del final debe ser obligatoria').custom( isDate ),
        //validarCampos
    ]
    , 
    crearCustomer);

router.put('/:id',
    [
    //check('title','El titulo es obligatorio').not().isEmpty(),
    //check('start','La fecha es obligatoria').custom( isDate ),
    //check('end','Fecha del final debe ser obligatoria').custom( isDate ),
    //validarCampos
    ],
    actualizarCustomer);

router.delete('/:id', eliminarCustomer);

module.exports = router; 
