const mongoose = require('mongoose');
const { bind } = require('./routes');


const gracefulShutDown = (server, mongoose) => {
  server.close();
  mongoose.connection.close();
  console.log('server:gracefulShutDown:info <===> Server gracefully shutdown!');
  process.exit();
}

const start = async (app) => {
  bind(app);
  const port = process.env.PORT || 3001
  const server = app.listen(port, (err) => {
    if (err) throw err;
    console.log(`server:start:info <===> Server started successfully on port ${port}`);
  });

  process.on('SIGINT', () => {
    gracefulShutDown(server, mongoose)
  });
};


module.exports = {
  start,
  gracefulShutDown
};
