const mongoose = require('mongoose');

const options1 = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    xuseCreateInde: true,
    strictQuery: true
  }

  const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  };

const dbConnection = async() => {

    try {
        
        console.log("Intentando conectar a la base de datos!!"); 
        mongoose.set('strictQuery', true);
        await mongoose.connect( process.env.DB_CNN,options);
        console.log('DB Online conectada OK !!!!');

    } catch (error) {
        console.log(error);
        //throw new Error('Error a la hora de inicializar BD');
    }


}


module.exports = {
    dbConnection
}