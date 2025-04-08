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
    console.log('Raw test results structure:', JSON.stringify(testResults, null, 2));

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

function convertToZephyrFormat(testResults) {
  const results = [];
  
  // テスト結果の構造を処理
  if (testResults.suites) {
    for (const suite of testResults.suites) {
      console.log('Processing suite:', suite.title);
      
      // 子スイートを処理
      if (suite.suites) {
        for (const childSuite of suite.suites) {
          console.log('Processing child suite:', childSuite.title);
          
          // テストケースキーの抽出と変換
          const testCaseKey = extractTestCaseKey(childSuite.title);
          console.log('Extracted test case key:', testCaseKey);
          
          if (!testCaseKey) {
            console.log('No test case key found in suite title');
            continue;
          }

          // テストケースキーを正しい形式に変換
          const convertedTestCaseKey = convertTestCaseKey(testCaseKey);
          console.log('Converted test case key:', convertedTestCaseKey);

          // テスト結果の集約
          if (childSuite.specs && childSuite.specs.length > 0) {
            const spec = childSuite.specs[0];
            const test = spec.tests[0];
            const result = test.results[0];

            results.push({
              testCaseKey: convertedTestCaseKey,
              status: result.status === 'passed' ? 'PASS' : 'FAIL',
              executionTime: result.duration || 0,
              executedOn: new Date().toISOString(),
              comment: result.error ? result.error.message : 'Test completed successfully'
            });
          }
        }
      }
    }
  }

  return results;
}

function extractTestCaseKey(title) {
  // タイトルからテストケースキーを抽出 (例: "***-T1: テストタイトル" → "***-T1")
  const match = title.match(/^([A-Z*]+-[A-Z0-9]+):/);
  if (!match) {
    console.log('No test case key found in title:', title);
    return null;
  }
  return match[1];
}

function convertTestCaseKey(key) {
  // テストケースキーを正しい形式に変換 (例: "***-T1" → "SCRUM-T1")
  if (key.startsWith('***-')) {
    return key.replace('***-', `${ZEPHYR_PROJECT_KEY}-`);
  }
  return key;
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