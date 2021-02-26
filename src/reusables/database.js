const mongoose = require('mongoose');

const attemptDBConnection = async () => {
  console.log('db:attemptDBConnection:info <===> Attempting database connection!');

   const conn = mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  });

  return conn
};

const dbConn = mongoose.connection;

dbConn.once('open', () => console.log('db:open:info <===> Successfully established connection with DB!'));
dbConn.on('close', () => console.log('db:close:info <===> Database connection closed!'));
dbConn.on('error', () => console.log('db:error:info <===> connection error:'));

module.exports = {
  attemptDBConnection
};
