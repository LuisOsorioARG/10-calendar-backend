const express = require('express'); 
require('dotenv').config(); 

//crear el servidor
const app = express(); 

//directorio publico
app.use( express.static('public')); 


// Lectura y parseo del Body
//app.use( express.json ); 

//ruta del get
//este use sigfnica que la ruta (primer parametro)
//la voy a asociar con lo que me exporte en el requere()
app.use('/api/auth',require('./routes/auth')); 


//escuchamos
app.listen( process.env.PORT, () => {
    console.log('servidor escuchano en puerto:', process.env.PORT); 
}); 