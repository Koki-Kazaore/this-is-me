const axios = require('axios');
const fs = require('fs');
const path = require('path');

const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY;

// Zephyr Scale APIのバージョンとエンドポイント
const API_VERSION = 'v2';
const TEST_EXECUTION_ENDPOINT = `${JIRA_BASE_URL}/rest/atm/${API_VERSION}/testexecution`;
const TEST_RESULT_ENDPOINT = `${JIRA_BASE_URL}/rest/atm/${API_VERSION}/testresult`;

async function updateTestResults() {
  try {
    // Playwrightのテスト結果を読み込む
    const reportPath = path.join(process.cwd(), 'playwright-report', 'report.json');
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

    // テストサイクルを作成
    const testCycle = await createTestCycle();

    // テストケースごとに結果を更新
    for (const suite of report.suites) {
      for (const test of suite.specs) {
        const testCaseId = extractTestCaseId(test.title);
        if (!testCaseId) continue;

        const status = test.ok ? 'PASS' : 'FAIL';
        const comment = generateTestComment(test);

        await updateTestResult(testCycle.id, testCaseId, status, comment);
      }
    }

    console.log('Successfully updated all test results in Zephyr');
  } catch (error) {
    console.error('Error updating test results:', error.response?.data || error.message);
    process.exit(1);
  }
}

async function createTestCycle() {
  const response = await axios.post(
    TEST_EXECUTION_ENDPOINT,
    {
      projectKey: JIRA_PROJECT_KEY,
      name: `Automated Test Run - ${new Date().toISOString()}`,
      description: 'Automated test execution from Playwright',
      folderId: process.env.ZEPHYR_FOLDER_ID, // オプション: 特定のフォルダに保存する場合
    },
    {
      headers: {
        'Authorization': `Bearer ${JIRA_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
}

async function updateTestResult(testCycleId, testCaseId, status, comment) {
  await axios.post(
    TEST_RESULT_ENDPOINT,
    {
      projectKey: JIRA_PROJECT_KEY,
      testCaseKey: testCaseId,
      testExecutionKey: testCycleId,
      status: status,
      comment: comment,
      executedBy: process.env.JIRA_USER || 'automated-test',
      executionDate: new Date().toISOString()
    },
    {
      headers: {
        'Authorization': `Bearer ${JIRA_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );
}

function extractTestCaseId(title) {
  const match = title.match(/\[(TEST-\d+)\]/);
  return match ? match[1] : null;
}

function generateTestComment(test) {
  return `
Test Execution Details:
- Status: ${test.ok ? 'PASS' : 'FAIL'}
- Duration: ${test.duration}ms
${test.error ? `- Error: ${test.error.message}\n${test.error.stack}` : ''}
- Execution Date: ${new Date().toISOString()}
`.trim();
}

updateTestResults();