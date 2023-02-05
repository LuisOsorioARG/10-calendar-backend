const { Router } = require('express'); 
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events'); 


const router = Router(); 


//por cualquier ruta que ejecute 
//primero pasa por este .use() para validar nuestro token
router.use( validarJWT ); 

router.get('/', getEventos);

router.post('/', crearEvento);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);

module.exports = router; 
