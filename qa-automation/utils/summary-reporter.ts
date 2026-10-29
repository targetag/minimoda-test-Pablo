import type { FullResult, Reporter, Suite } from '@playwright/test/reporter';
import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';

export default class SummaryReporter implements Reporter {
  private suite!: Suite;
  private archivePath?: string;
  onBegin(_config: unknown, suite: Suite) { this.suite = suite; }
  onEnd(result: FullResult) {
    if (!this.suite.allTests().some(test => test.results.length)) return;
    this.archivePath = `qa-runs/${result.startTime.toISOString().replace(/[:.]/g, '-')}`;
    const tests = this.suite.allTests().map(test => ({
      title: test.title,
      project: test.parent.project()?.name,
      outcome: test.outcome(),
      qaseIds: test.annotations.filter(a => a.type === 'QaseID').map(a => a.description),
      attempts: test.results.map(attempt => ({
        status: attempt.status, retry: attempt.retry, durationMs: attempt.duration,
        errors: attempt.errors.map(error => error.message),
        evidence: attempt.attachments.map(a => ({ name: a.name, path: a.path })),
      })),
    }));
    const counts = {
      passed: tests.filter(t => t.outcome === 'expected').length,
      failed: tests.filter(t => t.outcome === 'unexpected').length,
      flaky: tests.filter(t => t.outcome === 'flaky').length,
      skipped: tests.filter(t => t.outcome === 'skipped').length,
    };
    mkdirSync('test-results', { recursive: true });
    writeFileSync('test-results/run-summary.json', JSON.stringify({
      startedAt: result.startTime.toISOString(), durationMs: result.duration,
      status: result.status, counts, tests,
    }, null, 2));
    const lines = [
      '# MiniModa execution summary', '',
      `Started (UTC): ${result.startTime.toISOString()}`, `Duration: ${(result.duration / 1000).toFixed(1)} seconds`,
      `Result: ${result.status}`, '',
      `Passed: ${counts.passed}; failed: ${counts.failed}; flaky: ${counts.flaky}; skipped: ${counts.skipped}.`, '',
      '| Browser | Case | Outcome | Attempts |', '|---|---|---|---|',
      ...tests.map(t => `| ${t.project} | ${t.title} | ${t.outcome} | ${t.attempts.length} |`), '',
      'Detailed assertions, Qase IDs and artifact paths: run-summary.json and results.json.',
      'A failed assertion needs triage before it is called an application defect.', '',
    ];
    writeFileSync('test-results/run-summary.md', lines.join('\n'));
  }
  async onExit() {
    // Runs after all reporters flush their files; preserve every execution locally.
    if (!this.archivePath) return;
    mkdirSync(this.archivePath, { recursive: true });
    for (const directory of ['test-results', 'playwright-report']) {
      if (existsSync(directory)) cpSync(directory, `${this.archivePath}/${directory}`, { recursive: true });
    }
  }
}
