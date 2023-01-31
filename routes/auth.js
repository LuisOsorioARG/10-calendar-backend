const { Router } = require('express'); 

const { crearUsuario, loginUusuario, revalidarToken } = require('../controllers/auth'); 


const router = Router(); 


router.post('/new', crearUsuario );
router.post('/', loginUusuario );
router.get('/token', revalidarToken );

module.exports = router; 
