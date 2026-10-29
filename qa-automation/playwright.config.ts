import { defineConfig, devices } from '@playwright/test';
import type { ReporterDescription } from '@playwright/test';
import { config } from 'dotenv';

config({ quiet: true });

const reporters: ReporterDescription[] = [
  ['list'],
  ['html', { open: 'never' }],
  ['json', { outputFile: 'test-results/results.json' }],
  ['./utils/summary-reporter.ts'],
];

// Publishing is opt-in; a normal local run never contacts Qase.
if (process.env.QASE_MODE === 'testops') {
  if (!process.env.QASE_TESTOPS_API_TOKEN || !process.env.QASE_TESTOPS_PROJECT) {
    throw new Error('Qase publishing requires QASE_TESTOPS_API_TOKEN and QASE_TESTOPS_PROJECT.');
  }
  reporters.push(['playwright-qase-reporter', {
    mode: 'testops',
    testops: {
      api: { token: process.env.QASE_TESTOPS_API_TOKEN },
      project: process.env.QASE_TESTOPS_PROJECT,
      uploadAttachments: true,
      run: { title: 'MiniModa local automation', complete: true },
    },
    framework: { browser: { addAsParameter: true, parameterName: 'Browser' } },
  }]);
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 2,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  reporter: reporters,
  outputDir: 'test-results/artifacts',
  use: {
    baseURL: process.env.BASE_URL || 'https://minimoda-navy.vercel.app',
    locale: 'es-AR',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'off',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], browserName: 'chromium' } },
    { name: 'chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
  ],
});
