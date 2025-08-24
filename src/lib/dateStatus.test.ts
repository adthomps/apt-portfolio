import { describe, it, expect } from 'vitest';
import { getStatusBucket, parseDateSafe, RECENT_WINDOW_DAYS } from './dateStatus';

describe('parseDateSafe', () => {
  it('parses YYYY-MM-DD as UTC midnight', () => {
    const ts = parseDateSafe('2025-08-01');
    const d = new Date(ts);
    expect(d.toISOString().startsWith('2025-08-01T00:00:00')).toBe(true);
  });

  it('parses without timezone as UTC by appending Z', () => {
    const ts = parseDateSafe('2025-08-01T12:34:00');
    const d = new Date(ts);
    expect(d.toISOString().startsWith('2025-08-01T12:34:00')).toBe(true);
  });
});

describe('getStatusBucket', () => {
  it('returns Scheduled for future dates', () => {
    const future = new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString();
    expect(getStatusBucket(future)).toBe('Scheduled');
  });

  it('returns Recent within window', () => {
    const past = new Date(Date.now() - (RECENT_WINDOW_DAYS - 1) * 24 * 3600 * 1000).toISOString();
    expect(getStatusBucket(past)).toBe('Recent');
  });

  it('returns Archived beyond window', () => {
    const past = new Date(Date.now() - (RECENT_WINDOW_DAYS + 10) * 24 * 3600 * 1000).toISOString();
    expect(getStatusBucket(past)).toBe('Archived');
  });

  it('honors override: scheduled', () => {
    const past = new Date(Date.now() - 100 * 24 * 3600 * 1000).toISOString();
    expect(getStatusBucket(past, 'scheduled')).toBe('Scheduled');
  });

  it('honors override: archived', () => {
    const future = new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString();
    expect(getStatusBucket(future, 'archived')).toBe('Archived');
  });

  it('override published uses heuristic', () => {
    const now = new Date().toISOString();
    expect(getStatusBucket(now, 'published')).toMatch(/Recent|Archived/);
  });
});
