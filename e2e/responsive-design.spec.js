const { test, expect } = require('@playwright/test');

test.describe('Responsive Design', () => {
  const viewports = {
    mobile: { width: 375, height: 667, name: 'Mobile (iPhone)' },
    tablet: { width: 768, height: 1024, name: 'Tablet (iPad)' },
    desktop: { width: 1920, height: 1080, name: 'Desktop' },
  };

  for (const [device, viewport] of Object.entries(viewports)) {
    test(`should render correctly on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');

      // Navigation should be visible
      const navbar = page.locator('nav#menu');
      await expect(navbar).toBeVisible();

      // Header should be visible
      const header = page.locator('header');
      await expect(header).toBeVisible();

      // Main heading should be visible
      const mainHeading = header.locator('h1');
      await expect(mainHeading).toBeVisible();

      // Features section should be visible and responsive
      const features = page.locator('#features');
      await expect(features).toBeVisible();

      // About section should be visible
      const about = page.locator('#about');
      await expect(about).toBeVisible();

      // Services section should be visible
      const services = page.locator('#services');
      await expect(services).toBeVisible();

      // Gallery should be visible
      const gallery = page.locator('#portfolio');
      await expect(gallery).toBeVisible();

      // Contact section should be visible
      const contact = page.locator('#contact');
      await expect(contact).toBeVisible();

      // Form should be accessible
      const contactForm = contact.locator('form');
      await expect(contactForm).toBeVisible();
    });
  }

  test('should show mobile menu toggle on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Mobile toggle button should be visible
    const menuToggle = page.locator('.navbar-toggle');
    await expect(menuToggle).toBeVisible();

    // Desktop menu items might be hidden initially on mobile
    const navCollapse = page.locator('#bs-example-navbar-collapse-1');
    await expect(navCollapse).toBeAttached();
  });

  test('should hide mobile menu toggle on large screens', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    // Mobile toggle button should not be visible on desktop
    const menuToggle = page.locator('.navbar-toggle');

    // Button exists but should be hidden via CSS
    const isVisible = await menuToggle.isVisible();
    expect(isVisible).toBe(false);

    // Navigation links should be directly visible
    const navLinks = page.locator('.navbar-nav');
    await expect(navLinks).toBeVisible();
  });

  test('should have responsive grid layout for features', async ({ page }) => {
    // Test on desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    const featuresSection = page.locator('#features');
    await featuresSection.scrollIntoViewIfNeeded();

    const featureItems = featuresSection.locator('.col-xs-6.col-md-3');
    await expect(featureItems).toHaveCount(4);

    // All features should be visible
    for (let i = 0; i < 4; i++) {
      await expect(featureItems.nth(i)).toBeVisible();
    }

    // Test on mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await featuresSection.scrollIntoViewIfNeeded();

    // Features should still be visible but stacked
    await expect(featureItems).toHaveCount(4);
    await expect(featureItems.first()).toBeVisible();
  });

  test('should have responsive gallery layout', async ({ page }) => {
    // Test on desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    const gallery = page.locator('#portfolio');
    await gallery.scrollIntoViewIfNeeded();

    const galleryItems = gallery.locator('.portfolio-item');
    await expect(galleryItems).toHaveCount(9);

    // Gallery items should be visible
    const visibleItems = await galleryItems.count();
    expect(visibleItems).toBe(9);

    // Test on mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await gallery.scrollIntoViewIfNeeded();

    // Should still have all items but stacked vertically
    await expect(galleryItems).toHaveCount(9);
  });

  test('should have responsive contact form layout', async ({ page }) => {
    // Test on desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    const contact = page.locator('#contact');
    await contact.scrollIntoViewIfNeeded();

    const contactForm = contact.locator('form');
    await expect(contactForm).toBeVisible();

    const nameField = contactForm.locator('#name');
    const emailField = contactForm.locator('#email');

    await expect(nameField).toBeVisible();
    await expect(emailField).toBeVisible();

    // Test on mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await contact.scrollIntoViewIfNeeded();

    // Form should still be functional
    await expect(contactForm).toBeVisible();
    await expect(nameField).toBeVisible();
    await expect(emailField).toBeVisible();

    // Should be able to interact with form on mobile
    await nameField.fill('Mobile User');
    await expect(nameField).toHaveValue('Mobile User');
  });

  test('should maintain proper text sizing across viewports', async ({ page }) => {
    const viewportSizes = [
      { width: 375, height: 667 },
      { width: 768, height: 1024 },
      { width: 1920, height: 1080 },
    ];

    for (const viewport of viewportSizes) {
      await page.setViewportSize(viewport);
      await page.goto('/');

      // Check that main heading is visible and has text
      const mainHeading = page.locator('header h1');
      await expect(mainHeading).toBeVisible();

      const headingText = await mainHeading.textContent();
      expect(headingText).toBeTruthy();
      expect(headingText.length).toBeGreaterThan(0);

      // Check that text is readable (font size should be reasonable)
      const fontSize = await mainHeading.evaluate((el) => {
        return window.getComputedStyle(el).fontSize;
      });

      const fontSizeNum = parseFloat(fontSize);
      // Font size should be at least 16px on any device
      expect(fontSizeNum).toBeGreaterThanOrEqual(16);
    }
  });
});
