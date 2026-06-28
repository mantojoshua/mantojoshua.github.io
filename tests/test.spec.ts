import { test, expect } from '@playwright/test';

test('Verify that all the navigation links are working', async ({ page }) => {

    await page.goto('/');
    await page.getByRole('link', { name: '🏠Home' }).click();
    await expect(page.locator('#home')).toBeInViewport();
    await page.getByRole('link', { name: '💻Work' }).click();
    await expect(page.locator('#work')).toBeInViewport();
    await page.getByRole('link', { name: '🏆Certificates' }).click();
    await expect(page.locator('#certificate')).toBeInViewport();
    await page.getByRole('link', { name: '🔧Skills' }).click();
    await expect(page.locator('#skills')).toBeInViewport();    
    await page.getByRole('button', { name: 'Let\'s Connect' }).click();
    await expect(page.locator('#contact')).toBeInViewport();   
    await page.getByRole('link', { name: '🏠Home' }).click();
    await expect(page.locator('#home')).toBeInViewport();

});

test('Verify that the Work Experience is visible', async ({ page }) => {

    await page.goto('/');
    await page.getByRole('link', { name: '💻Work' }).click()
    await expect(page.getByText("Work Experience"))

});

test('Verify that the Certificates are visible', async ({ page }) => {

    await page.goto('/');
    await page.getByRole('link', { name: '🏆Certificates' }).click()
    await expect(page.locator('div').filter({ hasText: '🏆Certificates' }))

});

test('Verify that the Skills are visible', async ({ page }) => {

    await page.goto('/');
    await page.getByRole('link', { name: '🔧Skills' }).click();
    await expect(page.locator('div').filter({ hasText: '🔧Skills' }))

});

test('Verify that the Contacts are visible', async ({ page }) => {

    await page.goto('/');
    await page.getByRole('button', { name: 'Let\'s Connect' }).click();
    await expect(page.getByRole('heading', { name: '📞Contact Me' }))

});

test('Verify that the minigame are visible', async ({ page }) => {

    await page.goto('/');
    await page.getByRole('link', { name: '🏠Home' }).click();
    await expect(page.locator('embed').contentFrame().locator('#gameVideo'))

});