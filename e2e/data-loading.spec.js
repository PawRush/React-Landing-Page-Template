const { test, expect } = require('@playwright/test');

test.describe('Data Loading from JSON Files', () => {
  test('should load header data from JSON', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Check that data from data.json is loaded
    await expect(header.locator('h1')).toContainText('We are a Landing Page');
    await expect(header.locator('p')).toContainText('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
  });

  test('should load features data from JSON', async ({ page }) => {
    await page.goto('/');

    const features = page.locator('#features');
    await expect(features).toBeVisible();

    // Should have exactly 4 features as defined in data.json
    const featureItems = features.locator('.col-xs-6.col-md-3');
    await expect(featureItems).toHaveCount(4);

    // Check that features have icons (fa fa-* classes)
    const firstFeature = featureItems.first();
    const icon = firstFeature.locator('i.fa');
    await expect(icon).toBeVisible();

    // Check feature content
    await expect(firstFeature.locator('h3')).toContainText('Lorem ipsum');
    await expect(firstFeature.locator('p')).toContainText('Lorem ipsum dolor sit amet placerat facilisis');
  });

  test('should load about section data from JSON', async ({ page }) => {
    await page.goto('/');

    const about = page.locator('#about');
    await expect(about).toBeVisible();

    // Check main paragraph
    await expect(about.locator('p').first()).toContainText('Lorem ipsum dolor sit amet, consectetur adipiscing elit');

    // Check Why lists (should have 1 container with 2 lists inside, each with 4 items)
    const whyListContainer = about.locator('.list-style');
    await expect(whyListContainer).toHaveCount(1);

    // Check both ul elements within the list-style container
    const allLists = whyListContainer.locator('ul');
    await expect(allLists).toHaveCount(2);

    // First list items
    const firstList = allLists.first();
    const firstListItems = firstList.locator('li');
    await expect(firstListItems).toHaveCount(4);
    await expect(firstListItems.first()).toContainText('Lorem ipsum dolor');

    // Second list items
    const secondList = allLists.nth(1);
    const secondListItems = secondList.locator('li');
    await expect(secondListItems).toHaveCount(4);
    await expect(secondListItems.first()).toContainText('Aliquip ex ea commodo');
  });

  test('should load services data from JSON', async ({ page }) => {
    await page.goto('/');

    const services = page.locator('#services');
    await expect(services).toBeVisible();

    // Should have exactly 6 services as defined in data.json
    const serviceItems = services.locator('.col-md-4');
    await expect(serviceItems).toHaveCount(6);

    // Check first service
    const firstService = serviceItems.first();
    await expect(firstService.locator('i.fa')).toBeVisible();
    await expect(firstService.locator('h3')).toContainText('Lorem ipsum dolor');
    await expect(firstService.locator('p')).toContainText('Lorem ipsum dolor sit amet, consectetur adipiscing elit');

    // Verify different icons are used (from data.json)
    const firstServiceIcon = await firstService.locator('i.fa').getAttribute('class');
    expect(firstServiceIcon).toContain('fa-wordpress');

    const secondService = serviceItems.nth(1);
    const secondServiceIcon = await secondService.locator('i.fa').getAttribute('class');
    expect(secondServiceIcon).toContain('fa-cart-arrow-down');
  });

  test('should load gallery images from JSON', async ({ page }) => {
    await page.goto('/');

    const gallery = page.locator('#portfolio');
    await expect(gallery).toBeVisible();

    // Should have exactly 9 gallery items as defined in data.json
    const galleryItems = gallery.locator('.portfolio-item');
    await expect(galleryItems).toHaveCount(9);

    // Check that images are loaded
    const firstGalleryItem = galleryItems.first();
    const firstImage = firstGalleryItem.locator('img');
    await expect(firstImage).toBeVisible();

    // Verify image has hover overlay
    const hoverOverlay = firstGalleryItem.locator('.hover-bg');
    await expect(hoverOverlay).toBeAttached();
  });

  test('should load testimonials data from JSON', async ({ page }) => {
    await page.goto('/');

    const testimonials = page.locator('#testimonials');
    await expect(testimonials).toBeVisible();

    // Should have testimonials loaded from JSON (6 testimonials in data.json)
    const testimonialItems = testimonials.locator('.testimonial');

    // At least one testimonial should be visible (carousel might show subset)
    const testimonialCount = await testimonialItems.count();
    expect(testimonialCount).toBeGreaterThanOrEqual(1);

    // Check first visible testimonial has content
    const firstTestimonial = testimonials.locator('.testimonial').first();
    if (await firstTestimonial.isVisible()) {
      await expect(firstTestimonial.locator('.testimonial-content')).toContainText('Lorem ipsum dolor sit amet');
      await expect(firstTestimonial.locator('.testimonial-meta')).toContainText('John Doe');
    }
  });

  test('should load team data from JSON', async ({ page }) => {
    await page.goto('/');

    const team = page.locator('#team');
    await expect(team).toBeVisible();

    // Should have exactly 4 team members as defined in data.json
    const teamMembers = team.locator('.col-md-3.col-sm-6.team');
    await expect(teamMembers).toHaveCount(4);

    // Check first team member
    const firstMember = teamMembers.first();
    const memberImage = firstMember.locator('img');
    await expect(memberImage).toBeVisible();

    const memberName = firstMember.locator('h4');
    await expect(memberName).toContainText('John Doe');

    const memberJob = firstMember.locator('p');
    await expect(memberJob).toContainText('Director');

    // Verify different team members have different data
    const secondMember = teamMembers.nth(1);
    await expect(secondMember.locator('h4')).toContainText('Mike Doe');
    await expect(secondMember.locator('p')).toContainText('Senior Designer');
  });

  test('should load contact information from JSON', async ({ page }) => {
    await page.goto('/');

    const contact = page.locator('#contact');
    await expect(contact).toBeVisible();

    const contactInfo = contact.locator('.contact-info');

    // Verify all contact data from JSON is displayed
    await expect(contactInfo).toContainText('4321 California St, San Francisco, CA 12345');
    await expect(contactInfo).toContainText('+1 123 456 1234');
    await expect(contactInfo).toContainText('info@company.com');

    // Check social media links are loaded from JSON
    const facebookLink = page.locator('.social a[href*="fb.com"]');
    await expect(facebookLink).toBeVisible();

    const twitterLink = page.locator('.social a[href*="twitter.com"]');
    await expect(twitterLink).toBeVisible();

    const youtubeLink = page.locator('.social a[href*="youtube.com"]');
    await expect(youtubeLink).toBeVisible();
  });

  test('should handle data loading without errors', async ({ page }) => {
    // Listen for page errors (JavaScript errors)
    const pageErrors = [];
    page.on('pageerror', (error) => {
      pageErrors.push(error.message);
    });

    await page.goto('/');

    // Wait for data to load
    await page.waitForLoadState('networkidle');

    // Verify no JavaScript runtime errors occurred
    expect(pageErrors.length).toBe(0);

    // Verify page loaded successfully by checking multiple sections
    await expect(page.locator('#features')).toBeVisible();
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#services')).toBeVisible();
    await expect(page.locator('#portfolio')).toBeVisible();
  });

  test('should display loading states appropriately', async ({ page }) => {
    await page.goto('/');

    // Check contact section for "loading" text (shown before data loads)
    const contact = page.locator('#contact');

    // After page loads, should show actual data, not "loading"
    await page.waitForLoadState('networkidle');

    const contactInfo = contact.locator('.contact-info');
    const contactText = await contactInfo.textContent();

    // Should show actual address, not "loading"
    expect(contactText).toContain('4321 California St');
    expect(contactText).not.toContain('loading loading loading');
  });
});
