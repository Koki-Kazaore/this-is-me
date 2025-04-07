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
    // テスト結果ファイルの存在確認
    if (!fs.existsSync(TEST_RESULTS_PATH)) {
      console.error('Test results file not found');
      process.exit(1);
    }

    const testResults = JSON.parse(fs.readFileSync(TEST_RESULTS_PATH, 'utf8'));
    const zephyrResults = convertToZephyrFormat(testResults);

    // Zephyrへのアップロード
    await uploadToZephyr(zephyrResults);
    console.log('Test results uploaded to Zephyr successfully');
  } catch (error) {
    console.error('Error uploading test results to Zephyr:', error);
    process.exit(1);
  }
}

function convertToZephyrFormat(testResults) {
  return testResults.suites.map(suite => {
    return {
      testCaseKey: suite.title.split(':')[0].trim(),
      status: suite.tests.every(test => test.status === 'passed') ? 'PASS' : 'FAIL',
      executionTime: suite.tests.reduce((acc, test) => acc + test.duration, 0),
      executedOn: new Date().toISOString(),
      comment: suite.tests.map(test => `${test.title}: ${test.status}`).join('\n')
    };
  });
}

async function uploadToZephyr(results) {
  const response = await fetch('https://api.zephyrscale.smartbear.com/v2/testexecutions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ZEPHYR_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      projectKey: ZEPHYR_PROJECT_KEY,
      testExecutions: results
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to upload to Zephyr: ${response.statusText}`);
  }
}

// スクリプトの実行
if (!ZEPHYR_API_KEY || !ZEPHYR_PROJECT_KEY) {
  console.error('ZEPHYR_API_KEY and ZEPHYR_PROJECT_KEY are required');
  process.exit(1);
}

uploadTestResults();