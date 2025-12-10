const { test, expect } = require('@playwright/test');

test.describe('Navigation and Smooth Scrolling', () => {
  test('should navigate to sections using smooth scroll', async ({ page }) => {
    await page.goto('/');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Test clicking Features link
    await page.click('nav a[href="#features"]');
    await page.waitForTimeout(1500); // Wait for smooth scroll animation

    // Check if Features section is in viewport
    const featuresSection = page.locator('#features');
    await expect(featuresSection).toBeInViewport();

    // Test clicking About link
    await page.click('nav a[href="#about"]');
    await page.waitForTimeout(1500);

    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeInViewport();

    // Test clicking Services link
    await page.click('nav a[href="#services"]');
    await page.waitForTimeout(1500);

    const servicesSection = page.locator('#services');
    await expect(servicesSection).toBeInViewport();

    // Test clicking Gallery link
    await page.click('nav a[href="#portfolio"]');
    await page.waitForTimeout(1500);

    const portfolioSection = page.locator('#portfolio');
    await expect(portfolioSection).toBeInViewport();

    // Test clicking Contact link
    await page.click('nav a[href="#contact"]');
    await page.waitForTimeout(1500);

    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();

    // Test back to top by clicking brand logo
    await page.click('.navbar-brand[href="#page-top"]');
    await page.waitForTimeout(1500);

    // Check if we're back at the top (header should be visible)
    const header = page.locator('header');
    await expect(header).toBeInViewport();
  });

  test('should have working mobile navigation toggle', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Mobile menu toggle button should be visible on mobile
    const menuToggle = page.locator('.navbar-toggle');
    await expect(menuToggle).toBeVisible();

    // Navigation menu should initially be collapsed on mobile
    const navCollapse = page.locator('#bs-example-navbar-collapse-1');

    // Click to expand menu
    await menuToggle.click();
    await page.waitForTimeout(500);

    // Check if menu is expanded (has 'in' class or is visible)
    const navLinks = page.locator('#bs-example-navbar-collapse-1 .nav.navbar-nav');
    await expect(navLinks).toBeVisible();

    // Verify links are accessible
    const featuresLink = page.locator('nav a[href="#features"]');
    await expect(featuresLink).toBeVisible();

    // Click a link
    await featuresLink.click();
    await page.waitForTimeout(1500);

    // Verify navigation worked
    const featuresSection = page.locator('#features');
    await expect(featuresSection).toBeInViewport();
  });

  test('should maintain navigation bar on scroll', async ({ page }) => {
    await page.goto('/');

    const navbar = page.locator('nav#menu');

    // Navbar should be visible at top
    await expect(navbar).toBeVisible();
    await expect(navbar).toHaveClass(/navbar-fixed-top/);

    // Scroll down to middle of page
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);

    // Navbar should still be visible (fixed position)
    await expect(navbar).toBeVisible();

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Navbar should still be visible
    await expect(navbar).toBeVisible();
  });
});
