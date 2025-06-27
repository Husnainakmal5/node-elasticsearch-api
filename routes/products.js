// routes/products.js
const express = require('express');
const router = express.Router();
const ENUMS = require('../elastic_search/enums');

// Ensure index exists with custom analyzer

// CREATE Product
router.post('/', async (req, res) => {
  try {
    const { id, name, description, price } = req.body;

    const response = await req.elasticClient.index({
      index: ENUMS.CUSTOMER_INDEX,
      id,
      body: { name, description, price }
    });

    res.status(201).json({ message: 'Product indexed', response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SEARCH Products (full-text)
router.get('/search', async (req, res) => {
  try {
    const q = req.query.q;

    const result = await req.elasticClient.search({
      index: ENUMS.CUSTOMER_INDEX,
      query: {
        multi_match: {
          query: q,
          fields: ['name', 'description']
        }
      }
    });

    console.log(`Search results for query "${q}":`, result);
    const hits = result?.hits?.hits?.map(hit => ({
      id: hit._id,
      ...hit._source
    }));

    if (!hits || hits.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }
    res.json(hits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET Product by ID
router.get('/:id', async (req, res) => {
  try {
    const response = await req.elasticClient.get({
      index: ENUMS.CUSTOMER_INDEX,
      id: req.params.id
    });

    console.log(`Fetched product with ID ${req.params.id}:`, response);
    res.json(response._source);
  } catch (err) {
    res.status(404).json({ error: 'Product not found' });
  }
});

module.exports = router;
