const { Router } = require('express'); 
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');  
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getCustomers, crearCustomer, actualizarCustomer, eliminarCustomer } = require('../controllers/customer'); 


const router = Router(); 

//por cualquier ruta que ejecute 
//primero pasa por este .use() para validar nuestro token
router.use( validarJWT ); 

router.get('/customers', getCustomers);

router.post(
    '/new', 
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('phone','El celular o telefono son obligatorios').not().isEmpty(),
        validarCampos
    ]
    , 
    crearCustomer);

router.put('/:id',
    [
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('phone','El celular o telefono son obligatorios').not().isEmpty(),
    validarCampos
    ],
    actualizarCustomer);

router.delete('/:id', eliminarCustomer);

module.exports = router; 
