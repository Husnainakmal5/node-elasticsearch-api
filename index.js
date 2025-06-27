// index.js
const app = require('./app');

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Express API running on http://localhost:${PORT}`);
});
