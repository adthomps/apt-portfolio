import { defineConfig, devices } from '@playwright/test';

const PW_BASE_URL = process.env.PW_BASE_URL || 'https://apt-portfolio.apt-account.workers.dev/';
const isLocal = /^https?:\/\/localhost(?::\d+)?\/?$/.test(PW_BASE_URL) || PW_BASE_URL.startsWith('http://localhost:');

export default defineConfig({
  testDir: 'e2e',
  timeout: 30_000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: PW_BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: isLocal ? {
    command: 'pnpm dev',
    url: PW_BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  } : undefined,
});
