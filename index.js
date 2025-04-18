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
app.use(cors()); 

//directorio publico
app.use( express.static('public')); 


// Lectura y parseo del Body
app.use( express.json() ); 


app.use('/api/auth',require('./routes/auth')); 

app.use('/api/event',require('./routes/events')); 

app.use('/api/customer',require('./routes/customer')); 

app.use('/api/materiasprimas',require('./routes/materiasPrimas')); 

app.use('/api/recetas',require('./routes/recetas')); 

app.get('*',(req,res) => {
    res.sendFile( __dirname + '/public/index.html'); 
});

//escuchamos
app.listen( process.env.PORT, () => {
    console.log('servidor escuchando en puerto:', process.env.PORT); 
}); 