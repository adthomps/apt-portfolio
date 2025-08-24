---
Title: Legacy Hosted Payment Forms
Date: 2025-02-18
Summary: Testing legacy hosted payment methods including SIM, DPM, and Simple Checkout.
Category: Payment Processing
Status: Active
Technologies:
  - SIM
  - DPM
  - Simple Checkout
  - QR Code
Environments:
  - Production
  - Sandbox
Features:
  - Server Integration Method testing
  - Direct Post Method validation
  - Simple Checkout button flows
  - QR Code payment testing
  - Receipt handling methods
  - Multi-environment support
Goals:
  - Validate legacy payment form compatibility
  - Exercise receipt handling flows
  - Ensure migration paths are well understood
Testing Details: >-
  Comprehensive testing of Authorize.Net's legacy hosted payment form methods including
  Server Integration Method (SIM), Direct Post Method (DPM), and Simple Checkout buttons
  with various receipt handling options.
Promo Image: /placeholder.svg
Test Links:
  - name: SIM Testing - Production
    type: production
    route: test-sim-production
    externalUrl: https://adthomps.github.io/anet/hop.html
    description: Server Integration Method flow using production merchant.
  - name: SIM Testing - Sandbox
    type: sandbox
    route: test-sim-sandbox
    externalUrl: https://adthomps.github.io/anet/hop.html
    description: SIM flow using sandbox environment.
  - name: DPM Testing - Production
    type: production
    route: test-dpm-production
    externalUrl: https://adthomps.github.io/anet/hop.html
    description: Direct Post Method validation on production.
  - name: DPM Testing - Sandbox
    type: sandbox
    route: test-dpm-sandbox
    externalUrl: https://adthomps.github.io/anet/hop.html
    description: Direct Post Method validation on sandbox.
  - name: Simple Checkout Testing - Production
    type: production
    route: test-simplecheckout-production
    externalUrl: https://adthomps.github.io/anet/hop.html
    description: Simple Checkout button and receipt flow (prod).
  - name: Simple Checkout Testing - Sandbox
    type: sandbox
    route: test-simplecheckout-sandbox
    externalUrl: https://adthomps.github.io/anet/hop.html
    description: Simple Checkout button and receipt flow (sandbox).
---

## Notes

This area documents and validates legacy integrations that are still in use. Use the environment toggles to simulate different receipt behaviors.
