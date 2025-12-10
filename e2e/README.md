# End-to-End Test Suite

This directory contains comprehensive Playwright end-to-end tests for the React Landing Page Template.

## Overview

The test suite includes 29 tests covering all major functionality of the landing page application, organized into 5 test files:

### Test Files

1. **homepage.spec.js** (2 tests)
   - Verifies all sections render correctly
   - Validates navigation links are present

2. **navigation.spec.js** (3 tests)
   - Tests smooth scrolling between sections
   - Validates mobile navigation toggle functionality
   - Ensures fixed navigation bar stays visible on scroll

3. **contact-form.spec.js** (5 tests)
   - Validates form fields and attributes
   - Tests required field validation
   - Checks email format validation
   - Verifies form accepts valid input
   - Validates contact information display

4. **responsive-design.spec.js** (9 tests)
   - Tests rendering on mobile, tablet, and desktop viewports
   - Validates mobile menu toggle visibility
   - Checks responsive grid layouts for features and gallery
   - Tests responsive contact form layout
   - Verifies proper text sizing across viewports

5. **data-loading.spec.js** (10 tests)
   - Validates data loading from JSON for all sections:
     - Header
     - Features
     - About
     - Services
     - Gallery
     - Testimonials
     - Team
     - Contact
   - Tests error handling during data loading
   - Verifies loading states

## Test Coverage

The test suite covers:

- **Component Rendering**: All major sections (Navigation, Header, Features, About, Services, Gallery, Testimonials, Team, Contact)
- **Navigation**: Smooth scrolling, mobile menu, fixed navbar
- **Forms**: Validation, user interaction, error handling
- **Responsive Design**: Mobile (375px), Tablet (768px), Desktop (1920px)
- **Data Loading**: JSON data integration, error handling
- **Accessibility**: Proper HTML structure and attributes

## Running Tests

### Prerequisites

```bash
npm install
```

### Run All Tests

```bash
# Run tests in all browsers
npm run test:e2e

# Run tests in Chromium only
npm run test:e2e -- --project=chromium

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Run tests with UI mode (interactive)
npm run test:e2e:ui
```

### Run Specific Test Files

```bash
# Run only homepage tests
npm run test:e2e -- e2e/homepage.spec.js

# Run only navigation tests
npm run test:e2e -- e2e/navigation.spec.js

# Run only contact form tests
npm run test:e2e -- e2e/contact-form.spec.js

# Run only responsive design tests
npm run test:e2e -- e2e/responsive-design.spec.js

# Run only data loading tests
npm run test:e2e -- e2e/data-loading.spec.js
```

### View Test Report

After running tests, view the HTML report:

```bash
npm run test:e2e:report
```

## Configuration

The test configuration is defined in `playwright.config.js` at the project root:

- **Base URL**: http://localhost:3000
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari, Tablet
- **Timeout**: 30 seconds per test
- **Retries**: 2 retries in CI, 0 locally
- **Screenshots**: Only on failure
- **Traces**: On first retry

## Test Structure

Each test file follows this structure:

```javascript
const { test, expect } = require('@playwright/test');

test.describe('Test Suite Name', () => {
  test('should do something', async ({ page }) => {
    // Test implementation
  });
});
```

## Best Practices

1. **Wait for Elements**: Use `await expect(element).toBeVisible()` instead of hard-coded waits
2. **Locators**: Use semantic locators (IDs, roles, labels) when possible
3. **Assertions**: Include descriptive error messages
4. **Test Isolation**: Each test is independent and can run in any order
5. **Timeouts**: Adjust per-test timeouts for slow operations

## CI/CD Integration

The test suite is CI-ready and can be integrated into any CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
- name: Install dependencies
  run: npm install

- name: Install Playwright browsers
  run: npx playwright install --with-deps

- name: Run tests
  run: npm run test:e2e
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Tests Failing Locally

1. Clear browser cache: `npx playwright open --clear-cache`
2. Update Playwright: `npm install -D @playwright/test@latest`
3. Reinstall browsers: `npx playwright install`

### Slow Tests

- Run fewer tests in parallel: `npm run test:e2e -- --workers=2`
- Run in specific browser: `npm run test:e2e -- --project=chromium`

## Contributing

When adding new tests:

1. Place tests in the appropriate file based on functionality
2. Use descriptive test names starting with "should"
3. Follow existing test patterns and structure
4. Ensure tests are isolated and don't depend on each other
5. Add comments for complex assertions or logic

## Test Results

All 29 tests pass successfully on the following browsers:
- Chromium
- Firefox
- WebKit (Safari)
- Mobile Chrome
- Mobile Safari
- iPad Pro

**Test Execution Time**: ~18-30 seconds (parallel execution)
