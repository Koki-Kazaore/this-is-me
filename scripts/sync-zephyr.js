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
  // テスト結果をZephyrフォーマットに変換
  const results = [];

  for (const suite of testResults.suites || []) {
    // スイートのタイトルからテストケースキーを抽出
    const testCaseKey = extractTestCaseKey(suite.title);
    if (!testCaseKey) continue;

    // スイート内のすべてのテストケースの結果を集約
    const allTestResults = [];
    processTestResults(suite, allTestResults);

    // テスト実行結果を作成
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
  // スペックの処理
  if (suite.specs) {
    for (const spec of suite.specs) {
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

  // 子スイートの処理
  if (suite.suites) {
    for (const childSuite of suite.suites) {
      processTestResults(childSuite, results);
    }
  }
}

function extractTestCaseKey(title) {
  // タイトルからテストケースキーを抽出 (例: "SCRUM-T1: テストタイトル" → "SCRUM-T1")
  const match = title.match(/^([A-Z]+-[A-Z0-9]+):/);
  return match ? match[1] : null;
}

async function uploadToZephyr(results) {
  if (results.length === 0) {
    console.log('No test results to upload');
    return;
  }

  console.log('Uploading test results to Zephyr:', JSON.stringify(results, null, 2));

  const response = await fetch(`${ZEPHYR_API_BASE_URL}/testexecutions`, {
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