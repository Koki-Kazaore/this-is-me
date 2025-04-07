const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Zephyr API Settings
const ZEPHYR_API_KEY = process.env.ZEPHYR_API_KEY;
const ZEPHYR_PROJECT_KEY = process.env.ZEPHYR_PROJECT_KEY;
const ZEPHYR_API_BASE_URL = 'https://api.zephyrscale.smartbear.com/v2';

// Test results file path
const TEST_RESULTS_PATH = path.join(process.cwd(), 'test-results.json');

async function uploadTestResults() {
  try {
    // Read test results
    const testResults = JSON.parse(fs.readFileSync(TEST_RESULTS_PATH, 'utf8'));

    // Convert test results
    const zephyrResults = convertToZephyrFormat(testResults);

    // Upload to Zephyr
    await uploadToZephyr(zephyrResults);

    console.log('Test results successfully uploaded to Zephyr');
  } catch (error) {
    console.error('Error uploading test results:', error);
    process.exit(1);
  }
}

function convertToZephyrFormat(playwrightResults) {
  const results = [];

  // Process suites and test cases
  playwrightResults.suites.forEach(suite => {
    processTestSuite(suite, results);
  });

  return {
    version: 1,
    executions: results
  };
}

function processTestSuite(suite, results, parentTitle = '') {
  const suiteTitle = parentTitle ? `${parentTitle} / ${suite.title}` : suite.title;

  // Process test cases
  if (suite.specs) {
    suite.specs.forEach(spec => {
      const testCase = {
        testCaseKey: `${ZEPHYR_PROJECT_KEY}-${spec.title.replace(/\s+/g, '-')}`,
        status: spec.ok ? 'PASS' : 'FAIL',
        comment: spec.ok ? 'Test passed successfully' : getErrorMessage(spec),
        executionTime: getExecutionTime(spec),
        executedBy: process.env.GITHUB_ACTOR || 'automated-test',
      };
      results.push(testCase);
    });
  }

  // Process child suites
  if (suite.suites) {
    suite.suites.forEach(childSuite => {
      processTestSuite(childSuite, results, suiteTitle);
    });
  }
}

function getErrorMessage(spec) {
  if (!spec.tests || !spec.tests[0] || !spec.tests[0].results) return 'Unknown error';
  const result = spec.tests[0].results[0];
  return result.error ? result.error.message : 'Test failed without error message';
}

function getExecutionTime(spec) {
  if (!spec.tests || !spec.tests[0] || !spec.tests[0].results) return 0;
  return spec.tests[0].results[0].duration || 0;
}

async function uploadToZephyr(results) {
  const response = await fetch(`${ZEPHYR_API_BASE_URL}/testexecutions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ZEPHYR_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(results)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to upload to Zephyr: ${error}`);
  }

  return await response.json();
}

// Run the script
uploadTestResults();