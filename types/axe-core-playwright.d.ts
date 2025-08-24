declare module '@axe-core/playwright' {
  import type { Page } from '@playwright/test';

  export type AxeViolation = { id: string };
  export type AxeResults = { violations: AxeViolation[] };

  export default class AxeBuilder {
    constructor(args: { page: Page });
    include(selector: string): this;
    exclude(selector: string): this;
    withTags(tags: string[]): this;
    withRules(rules: string[]): this;
    disableRules(rules: string[]): this;
    analyze(): Promise<AxeResults>;
  }
}
