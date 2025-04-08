const axios = require('axios');
const fs = require('fs');
const path = require('path');

const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY;

async function updateTestResults() {
  try {
    // Playwrightのテスト結果を読み込む
    const reportPath = path.join(process.cwd(), 'playwright-report', 'report.json');
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

    // テストケースごとに結果を更新
    for (const test of report.suites[0].specs) {
      const testCaseId = extractTestCaseId(test.title);
      if (!testCaseId) continue;

      const status = test.ok ? 'PASS' : 'FAIL';
      const comment = generateTestComment(test);

      await updateJiraTestCase(testCaseId, status, comment);
    }
  } catch (error) {
    console.error('Error updating test results:', error);
    process.exit(1);
  }
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
- Error: ${test.error ? test.error.message : 'None'}
  `.trim();
}

async function updateJiraTestCase(testCaseId, status, comment) {
  const url = `${JIRA_BASE_URL}/rest/zapi/latest/testresult`;

  const payload = {
    testCaseId,
    status,
    comment,
    projectKey: JIRA_PROJECT_KEY
  };

  await axios.post(url, payload, {
    headers: {
      'Authorization': `Bearer ${JIRA_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
}

updateTestResults();