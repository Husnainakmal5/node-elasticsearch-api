// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const client = require('./elastic');
const createIndexIfNotExists = require('./elastic_search/default_index'); // Import the function to create index if it doesn't exist
const productRoutes = require('./routes/products');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  try {
    console.log('Setting up ElasticSearch client...');
    req.elasticClient = client;
  } catch (err) {
    console.error('Error setting up:', err.message);
    next(err);
  }
  next();
});

(async () => {
  await createIndexIfNotExists(client);
})();

app.use('/api/products', productRoutes);

module.exports = app;
