const ENUMS = require('./enums');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function createIndexIfNotExists(elasticClient, retries = 5, delay = 3000) {
  for (const indexName of ENUMS.DEFAULT_INDEXES) {
    let created = false;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const exists = await elasticClient.indices.exists({ index: indexName });

        if (!exists) {
          await elasticClient.indices.create({
            index: indexName,
            body: {
              settings: {
                analysis: {
                  analyzer: {
                    custom_english: {
                      type: 'standard',
                      stopwords: '_english_'
                    }
                  }
                }
              },
              mappings: {
                properties: {
                  name: { type: 'text', analyzer: 'custom_english' },
                  description: { type: 'text', analyzer: 'custom_english' },
                  price: { type: 'float' }
                }
              }
            }
          });

          console.log(`✅ Created index: '${indexName}'`);
        } else {
          console.log(`ℹ️ Index '${indexName}' already exists`);
        }

        created = true;
        break; // index handled, move to next
      } catch (err) {
        console.error(`❌ Attempt ${attempt} for '${indexName}' failed: ${err.message}`);

        if (attempt < retries) {
          console.log(`🔁 Retrying in ${delay / 1000} seconds...`);
          await sleep(delay);
        } else {
          console.error(`🚫 Failed to handle index '${indexName}' after ${retries} attempts.`);
          process.exit(1); // exit entire app if a required index can't be created
        }
      }
    }

    if (!created) {
      console.warn(`⚠️ Skipping index '${indexName}' after repeated failures.`);
    }
  }
}

module.exports = createIndexIfNotExists;
