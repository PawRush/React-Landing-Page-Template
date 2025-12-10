const { test, expect } = require('@playwright/test');

test.describe('Homepage and Section Rendering', () => {
  test('should load homepage and render all sections correctly', async ({ page }) => {
    await page.goto('/');

    // Verify page title
    await expect(page).toHaveTitle(/React/i);

    // Check Navigation is visible
    const navigation = page.locator('#menu');
    await expect(navigation).toBeVisible();
    await expect(navigation.locator('.navbar-brand')).toContainText('React Landing Page');

    // Check Header section
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header.locator('h1')).toContainText('We are a Landing Page');
    await expect(header.locator('p')).toContainText('Lorem ipsum dolor sit amet');

    // Check Features section
    const features = page.locator('#features');
    await expect(features).toBeVisible();
    await expect(features.locator('h2')).toContainText('Features');

    // Verify Features are loaded from JSON (should have 4 feature items)
    const featureItems = features.locator('.col-xs-6.col-md-3');
    await expect(featureItems).toHaveCount(4);

    // Check first feature has icon and content
    const firstFeature = featureItems.first();
    await expect(firstFeature.locator('i.fa')).toBeVisible();
    await expect(firstFeature.locator('h3')).toContainText('Lorem ipsum');

    // Check About section
    const about = page.locator('#about');
    await expect(about).toBeVisible();
    await expect(about.locator('h2')).toContainText('About Us');
    await expect(about.locator('p')).toContainText('Lorem ipsum');

    // Check Services section
    const services = page.locator('#services');
    await expect(services).toBeVisible();
    await expect(services.locator('h2')).toContainText('Our Services');

    // Verify Services are loaded from JSON (should have 6 service items)
    const serviceItems = services.locator('.col-md-4');
    await expect(serviceItems).toHaveCount(6);

    // Check Gallery/Portfolio section
    const gallery = page.locator('#portfolio');
    await expect(gallery).toBeVisible();
    await expect(gallery.locator('h2')).toContainText('Gallery');

    // Verify Gallery items are loaded from JSON (should have 9 images)
    const galleryItems = gallery.locator('.portfolio-item');
    await expect(galleryItems).toHaveCount(9);

    // Check Testimonials section
    const testimonials = page.locator('#testimonials');
    await expect(testimonials).toBeVisible();
    await expect(testimonials.locator('h2')).toContainText('What our clients say');

    // Check Team section
    const team = page.locator('#team');
    await expect(team).toBeVisible();
    await expect(team.locator('h2')).toContainText('Meet the Team');

    // Verify Team members are loaded from JSON (should have 4 team members)
    const teamMembers = team.locator('.col-md-3.col-sm-6.team');
    await expect(teamMembers).toHaveCount(4);

    // Check Contact section
    const contact = page.locator('#contact');
    await expect(contact).toBeVisible();
    await expect(contact.locator('h2')).toContainText('Get In Touch');

    // Verify contact form exists
    await expect(contact.locator('form[name="sentMessage"]')).toBeVisible();

    // Verify contact info is loaded from JSON
    await expect(contact.locator('.contact-info')).toContainText('4321 California St');
    await expect(contact.locator('.contact-info')).toContainText('+1 123 456 1234');
    await expect(contact.locator('.contact-info')).toContainText('info@company.com');

    // Check Footer
    const footer = page.locator('#footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('2023');
  });

  test('should verify all navigation links are present', async ({ page }) => {
    await page.goto('/');

    const navLinks = [
      { href: '#features', text: 'Features' },
      { href: '#about', text: 'About' },
      { href: '#services', text: 'Services' },
      { href: '#portfolio', text: 'Gallery' },
      { href: '#testimonials', text: 'Testimonials' },
      { href: '#team', text: 'Team' },
      { href: '#contact', text: 'Contact' },
    ];

    for (const link of navLinks) {
      const navLink = page.locator(`nav a[href="${link.href}"]`);
      await expect(navLink).toBeVisible();
      await expect(navLink).toContainText(link.text);
    }
  });
});
