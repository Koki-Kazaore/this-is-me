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
    console.log('Raw test results:', JSON.stringify(testResults, null, 2));

    const zephyrResults = convertToZephyrFormat(testResults);
    console.log('Converted Zephyr results:', JSON.stringify(zephyrResults, null, 2));

    if (zephyrResults.length === 0) {
      console.log('No test results to upload after conversion');
      return;
    }

    // テストサイクルの作成
    const cycleId = await createTestCycle();
    console.log(`Created test cycle: ${cycleId}`);

    // テストサイクルにテストケースを追加
    await addTestCasesToCycle(cycleId, zephyrResults);

    // テスト実行結果のアップロード
    await uploadToZephyr(cycleId, zephyrResults);
    console.log('Test results uploaded to Zephyr successfully');
  } catch (error) {
    console.error('Error uploading test results to Zephyr:', error);
    process.exit(1);
  }
}

async function createTestCycle() {
  const response = await fetch(`${ZEPHYR_API_BASE_URL}/testcycles`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ZEPHYR_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      projectKey: ZEPHYR_PROJECT_KEY,
      name: `Regression Test - ${new Date().toISOString()}`,
      description: 'Automated regression test execution'
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create test cycle: ${response.status} ${response.statusText}\n${errorText}`);
  }

  const data = await response.json();
  return data.id;
}

async function addTestCasesToCycle(cycleId, testResults) {
  const testCaseKeys = testResults.map(result => result.testCaseKey);
  console.log('Adding test cases to cycle:', testCaseKeys);
  
  const response = await fetch(`${ZEPHYR_API_BASE_URL}/testcycles/${cycleId}/testcases`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ZEPHYR_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      testCaseKeys: testCaseKeys
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to add test cases to cycle: ${response.status} ${response.statusText}\n${errorText}`);
  }

  console.log('Successfully added test cases to cycle');
}

function convertToZephyrFormat(testResults) {
  const results = [];
  
  for (const suite of testResults.suites || []) {
    console.log('Processing suite:', suite.title);
    const testCaseKey = extractTestCaseKey(suite.title);
    console.log('Extracted test case key:', testCaseKey);
    
    if (!testCaseKey) {
      console.log('No test case key found in suite title');
      continue;
    }

    const allTestResults = [];
    processTestResults(suite, allTestResults);
    console.log('Processed test results:', allTestResults);

    if (allTestResults.length > 0) {
      results.push({
        testCaseKey: testCaseKey,
        status: allTestResults.every(test => test.status === 'passed') ? 'PASS' : 'FAIL',
        executionTime: allTestResults.reduce((acc, test) => acc + (test.duration || 0), 0),
        executedOn: new Date().toISOString(),
        comment: allTestResults.map(test => 
          `${test.title}: ${test.status}${test.error ? '\nError: ' + test.error : ''}`
        ).join('\n')
      });
    }
  }

  return results;
}

function processTestResults(suite, results) {
  if (suite.specs) {
    for (const spec of suite.specs) {
      console.log('Processing spec:', spec.title);
      for (const test of spec.tests || []) {
        results.push({
          title: spec.title,
          status: test.results?.[0]?.status || 'failed',
          duration: test.results?.[0]?.duration || 0,
          error: test.results?.[0]?.error?.message
        });
      }
    }
  }

  if (suite.suites) {
    for (const childSuite of suite.suites) {
      processTestResults(childSuite, results);
    }
  }
}

function extractTestCaseKey(title) {
  const match = title.match(/^([A-Z]+-[A-Z0-9]+):/);
  return match ? match[1] : null;
}

async function uploadToZephyr(cycleId, results) {
  if (results.length === 0) {
    console.log('No test results to upload');
    return;
  }

  console.log('Uploading test results to Zephyr:', JSON.stringify(results, null, 2));

  const response = await fetch(`${ZEPHYR_API_BASE_URL}/testcycles/${cycleId}/testexecutions`, {
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
    const errorText = await response.text();
    throw new Error(`Failed to upload to Zephyr: ${response.status} ${response.statusText}\n${errorText}`);
  }
}

// スクリプトの実行
if (!ZEPHYR_API_KEY || !ZEPHYR_PROJECT_KEY) {
  console.error('ZEPHYR_API_KEY and ZEPHYR_PROJECT_KEY are required');
  process.exit(1);
}

uploadTestResults();