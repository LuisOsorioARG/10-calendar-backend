const { Router } = require('express'); 
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearUsuario, loginUusuario, revalidarToken } = require('../controllers/auth'); 


const router = Router(); 


router.post(
    '/new',
    [ 
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('name','El nombre debe ser mayor a 4 caracteres').isLength(4),
        check('email','El email es obligatorio').isEmail(),
        check('password','el password debe ser de 6 caracteres').isLength(6),
        validarCampos
    ],
     crearUsuario );

router.post(
    '/', 
    [      
        check('email','El email es obligatorio').isEmail(),
        check('password','el password debe ser de 6 caracteres').isLength(6),
        validarCampos
    ],
    loginUusuario );

router.get('/token', validarJWT, revalidarToken );

module.exports = router; 
