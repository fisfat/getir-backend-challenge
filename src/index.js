const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const { attemptDBConnection } = require('./reusables/database');
const { start } = require('./server');

dotenv.config();

if (!process.env.MONGO_URI) {
  console.log('ENV Variable MONGO_URI not detected! The variable is required for this to work.');
  process.exit();
}

const app = express();

app.use(cors());
app.set('trust proxy', true);

if (process.env.NODE_ENV === 'production') {
  app.use(compression());
  app.use(helmet());
} else {
  app.use(morgan('dev'));
}

app.use(express.json());

attemptDBConnection()
  .then(() => start(app).catch((err) => console.log(`index:attemptDBConnection:error <===> ${err && err.message}`)))
  .catch((err) => console.log(`index:attemptDBConnection:error <===> ${err && err.message}`));