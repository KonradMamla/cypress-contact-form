# cypress-contact-form

E2E tests for the contact form on [automationintesting.online](https://automationintesting.online).

---

## Stack

- Cypress 13.x
- TypeScript 5.4
- Node.js 18+

## Prerequisites

- Node.js v18+
- npm

## Installation

```bash
git clone https://github.com/KonradMamla/cypress-contact-form.git
cd cypress-contact-form
npm install
```

## Running tests

```bash
npm run cy:open        # interactive mode
npm run cy:run         # headless
npm run cy:run:headed  # headed, browser stays open
```

## What is tested

Contact form happy path — form submission with UI and API assertion.

- UI: success message visible after submission
- API: `POST /api/message` payload matches submitted form data

## Defect detected

`POST /api/message` returns `200` instead of `201 Created` as specified in requirements.
