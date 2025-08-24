---
Title: Accept Suite API Testing
Date: 2025-02-20
Summary: Comprehensive testing framework for Authorize.net Accept Suite integration.
Category: Payment Processing
Status: Active
Technologies:
  - Accept.js
  - Accept UI
  - Accept Customer
  - Accept Hosted
Environments:
  - Production
  - Sandbox
Features:
  - Payment form integration testing
  - Tokenization and security validation
  - PCI compliance verification
  - Cross-browser compatibility
  - Error handling scenarios
  - Mobile responsiveness testing
Goals:
  - Ensure seamless payment processing integration
  - Validate security protocols and PCI compliance
  - Test various payment methods and scenarios
  - Verify error handling and user experience
Testing Details: >-
  This testing suite covers all aspects of Authorize.net Accept Suite integration including
  Accept.js for tokenization, Accept UI for hosted payment forms, Accept Customer for stored
  payment methods, and Accept Hosted for complete payment page hosting.
Promo Image: /placeholder.svg
Test Links:
  - name: Accept.js - Production - v1
    type: production
    externalUrl: https://adthomps.github.io/anet/accept/acceptjsp.html
    description: Client-side tokenization flow against production endpoints.
  - name: Accept.js - Production - v2
    type: production
    externalUrl: https://adthomps.github.io/anet/accept/acceptjspv2.html
    description: Client-side tokenization flow against production endpoints.

  - name: Accept.js - Sandbox - v1
    type: sandbox
    externalUrl: https://adthomps.github.io/anet/accept/acceptjss.html
    description: Client-side tokenization flow using sandbox credentials.
  - name: Accept.js - Sandbox - v2
    type: sandbox
    externalUrl: https://adthomps.github.io/anet/accept/acceptjssv2.html
    description: Client-side tokenization flow using sandbox credentials.

  - name: Accept UI - Production - v1
    type: production
    externalUrl: https://adthomps.github.io/anet/accept/acceptuipv1.html
    description: Hosted payment form (Accept UI) on production.
  - name: Accept UI - Production - v2
    type: production
    externalUrl: https://adthomps.github.io/anet/accept/acceptuipv2.html
    description: Hosted payment form (Accept UI) on production.

  - name: Accept UI - Sandbox - v1
    type: sandbox
    externalUrl: https://adthomps.github.io/anet/accept/acceptuisv1.html
    description: Hosted payment form (Accept UI) on sandbox.
  - name: Accept UI - Sandbox - v2
    type: sandbox
    externalUrl: https://adthomps.github.io/anet/accept/acceptuisv2.html
    description: Hosted payment form (Accept UI) on sandbox.

  - name: Accept Customer - Production (JSON)
    type: production
    externalUrl: https://adthomps.github.io/anet/acceptcustomer/acceptcustomerpjson.html
    description: Customer profiles and stored payments via XML API (prod).
  - name: Accept Customer - Sandbox (JSON)
    type: sandbox
    externalUrl: https://adthomps.github.io/anet/acceptcustomer/acceptcustomersjson.html
    description: Customer profiles and stored payments via XML API (sandbox).

  - name: Accept Hosted - Production - v1
    type: production
    externalUrl: https://adthomps.github.io/anet/accepthosted/accepthostedp.html
    description: Complete hosted checkout page on production.
  - name: Accept Hosted - Production - v2
    type: production
    externalUrl: https://adthomps.github.io/anet/accepthosted/accepthostedpv2.html
    description: Complete hosted checkout page on production.
  - name: Accept Hosted - Sandbox - v1
    type: sandbox
    externalUrl: https://adthomps.github.io/anet/accepthosted/accepthosteds.html
    description: Complete hosted checkout page on sandbox.
  - name: Accept Hosted - Sandbox - v2
    type: sandbox
    externalUrl: https://adthomps.github.io/anet/accepthosted/accepthostedsv2.html
    description: Complete hosted checkout page on sandbox.

---

## Overview

This suite validates end-to-end flows for the Accept product line, including client tokenization and hosted form experiences. It is designed to mirror real-world integration paths and ensure PCI-safe handling.

## Architecture

- Client tokenization with Accept.js
- Hosted payment form journeys via Accept UI and Accept Hosted
- Customer profiles and saved payments with Accept Customer
- Environment toggles for Production and Sandbox
