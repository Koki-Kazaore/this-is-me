import { Reporter, TestError, TestStatus } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

class ZephyrReporter implements Reporter {
  private testResults: any[] = [];

  onTestEnd(test: any, result: any) {
    const testResult = {
      testKey: test.title,
      status: this.mapStatus(result.status),
      startTime: result.startTime,
      endTime: result.startTime + result.duration,
      duration: result.duration,
      error: result.error ? this.formatError(result.error) : null,
      attachments: result.attachments || [],
    };

    this.testResults.push(testResult);
  }

  async onEnd() {
    const outputDir = path.join(process.cwd(), 'test-results');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const zephyrResults = {
      testResults: this.testResults,
      timestamp: new Date().toISOString(),
    };

    fs.writeFileSync(
      path.join(outputDir, 'zephyr-results.json'),
      JSON.stringify(zephyrResults, null, 2)
    );
  }

  private mapStatus(status: TestStatus): string {
    switch (status) {
      case 'passed':
        return 'PASS';
      case 'failed':
        return 'FAIL';
      case 'timedOut':
        return 'FAIL';
      case 'skipped':
        return 'SKIP';
      default:
        return 'UNKNOWN';
    }
  }

  private formatError(error: TestError): string {
    return `${error.message}\n${error.stack || ''}`;
  }
}

export default ZephyrReporter;