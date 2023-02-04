const express = require('express'); 
require('dotenv').config(); 
const cors = require('cors'); 
const { dbConnection } = require('./database/config');

/*

acceso a base de datos

usuario:mern_user
password:mCBKLCb0u4655Ydm

Link para conexion: 
mongodb+srv://mern_user:mCBKLCb0u4655Ydm@cluster0.mkxx944.mongodb.net/test

*/

//crear el servidor
const app = express(); 

//acceso a base de datos
dbConnection(); 


//aplicamos el cors


//directorio publico
app.use( express.static('public')); 


// Lectura y parseo del Body
app.use( express.json() ); 

//ruta del get
//este use sigfnica que la ruta (primer parametro)
//la voy a asociar con lo que me exporte en el requere()
app.use('/api/auth',require('./routes/auth')); 


//escuchamos
app.listen( process.env.PORT, () => {
    console.log('servidor escuchano en puerto:', process.env.PORT); 
}); 