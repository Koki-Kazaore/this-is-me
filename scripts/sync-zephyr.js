const fs = require('fs');
const path = require('path');
const axios = require('axios');

const ZEPHYR_API_URL = 'https://api.zephyrscale.smartbear.com/v2';
const TEST_RESULTS_PATH = path.join(process.cwd(), 'test-results', 'zephyr-results.json');

async function syncWithZephyr() {
  try {
    const testResults = JSON.parse(fs.readFileSync(TEST_RESULTS_PATH, 'utf8'));

    for (const result of testResults.testResults) {
      const testCase = {
        projectKey: process.env.ZEPHYR_PROJECT_KEY,
        name: result.testKey,
        status: result.status,
        executionTime: result.duration,
        executedOn: new Date(result.startTime).toISOString(),
        comment: result.error ? `Error: ${result.error}` : '',
      };

      await axios.post(
        `${ZEPHYR_API_URL}/testcases/executions`,
        testCase,
        {
          headers: {
            'Authorization': `Bearer ${process.env.ZEPHYR_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    console.log('Successfully synced test results with Zephyr');
  } catch (error) {
    console.error('Error syncing with Zephyr:', error.message);
    process.exit(1);
  }
}

syncWithZephyr();