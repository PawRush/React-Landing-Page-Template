const { test, expect } = require('@playwright/test');

test.describe('Contact Form Validation and Interactions', () => {
  test('should display contact form with all required fields', async ({ page }) => {
    await page.goto('/');

    // Navigate to contact section
    await page.click('nav a[href="#contact"]');
    await page.waitForTimeout(1500);

    const contactForm = page.locator('form[name="sentMessage"]');
    await expect(contactForm).toBeVisible();

    // Check all form fields exist
    const nameField = contactForm.locator('#name');
    const emailField = contactForm.locator('#email');
    const messageField = contactForm.locator('#message');
    const submitButton = contactForm.locator('button[type="submit"]');

    await expect(nameField).toBeVisible();
    await expect(emailField).toBeVisible();
    await expect(messageField).toBeVisible();
    await expect(submitButton).toBeVisible();

    // Check field attributes
    await expect(nameField).toHaveAttribute('placeholder', 'Name');
    await expect(emailField).toHaveAttribute('placeholder', 'Email');
    await expect(messageField).toHaveAttribute('placeholder', 'Message');

    // Check required attributes
    await expect(nameField).toHaveAttribute('required', '');
    await expect(emailField).toHaveAttribute('required', '');
    await expect(messageField).toHaveAttribute('required', '');

    // Check email field type
    await expect(emailField).toHaveAttribute('type', 'email');

    // Check submit button text
    await expect(submitButton).toContainText('Send Message');
  });

  test('should validate required fields on submission', async ({ page }) => {
    await page.goto('/');

    // Navigate to contact section
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();

    const contactForm = page.locator('form[name="sentMessage"]');
    const submitButton = contactForm.locator('button[type="submit"]');

    // Try to submit empty form
    await submitButton.click();

    // Browser's built-in validation should prevent submission
    // Check that we're still on the same page (form wasn't submitted)
    await expect(contactForm).toBeVisible();

    // Name field should show validation message (HTML5 validation)
    const nameField = contactForm.locator('#name');
    const isNameInvalid = await nameField.evaluate((el) => !el.validity.valid);
    expect(isNameInvalid).toBe(true);
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/');

    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();

    const contactForm = page.locator('form[name="sentMessage"]');
    const nameField = contactForm.locator('#name');
    const emailField = contactForm.locator('#email');
    const messageField = contactForm.locator('#message');
    const submitButton = contactForm.locator('button[type="submit"]');

    // Fill form with invalid email
    await nameField.fill('John Doe');
    await emailField.fill('invalid-email');
    await messageField.fill('This is a test message');

    await submitButton.click();

    // Email field should be invalid
    const isEmailInvalid = await emailField.evaluate((el) => !el.validity.valid);
    expect(isEmailInvalid).toBe(true);

    // Now fill with valid email
    await emailField.clear();
    await emailField.fill('john.doe@example.com');

    const isEmailValid = await emailField.evaluate((el) => el.validity.valid);
    expect(isEmailValid).toBe(true);
  });

  test('should accept valid form input', async ({ page }) => {
    await page.goto('/');

    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();

    const contactForm = page.locator('form[name="sentMessage"]');
    const nameField = contactForm.locator('#name');
    const emailField = contactForm.locator('#email');
    const messageField = contactForm.locator('#message');

    // Fill form with valid data
    await nameField.fill('Jane Smith');
    await emailField.fill('jane.smith@example.com');
    await messageField.fill('This is a test message for the contact form. It should accept this input without any issues.');

    // Verify fields are filled
    await expect(nameField).toHaveValue('Jane Smith');
    await expect(emailField).toHaveValue('jane.smith@example.com');
    await expect(messageField).toHaveValue('This is a test message for the contact form. It should accept this input without any issues.');

    // Check that all fields are now valid
    const isNameValid = await nameField.evaluate((el) => el.validity.valid);
    const isEmailValid = await emailField.evaluate((el) => el.validity.valid);
    const isMessageValid = await messageField.evaluate((el) => el.validity.valid);

    expect(isNameValid).toBe(true);
    expect(isEmailValid).toBe(true);
    expect(isMessageValid).toBe(true);
  });

  test('should display contact information correctly', async ({ page }) => {
    await page.goto('/');

    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();

    const contactInfo = page.locator('.contact-info');

    // Verify contact information is displayed
    await expect(contactInfo).toContainText('4321 California St, San Francisco, CA 12345');
    await expect(contactInfo).toContainText('+1 123 456 1234');
    await expect(contactInfo).toContainText('info@company.com');

    // Verify social media links
    const socialLinks = page.locator('.social ul li a');
    await expect(socialLinks).toHaveCount(3);

    // Check for Facebook, Twitter, and YouTube icons
    await expect(page.locator('.social .fa-facebook')).toBeVisible();
    await expect(page.locator('.social .fa-twitter')).toBeVisible();
    await expect(page.locator('.social .fa-youtube')).toBeVisible();
  });
});
