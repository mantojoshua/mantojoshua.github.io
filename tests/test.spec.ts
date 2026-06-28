import { test, expect } from '@playwright/test';

let baseUrl:string = 'https://mantojoshua.github.io/'

test('Verify that all the navigation links are working', async ({ page }) => {

    await page.goto(baseUrl);
    await page.getByRole('link', { name: '🏠Home' }).click();
    await expect(page).toHaveURL(/#home$/);
    await page.getByRole('link', { name: '💻Work' }).click();
    await expect(page).toHaveURL(/#work$/);
    await page.getByRole('link', { name: '🏆Certificates' }).click();
    await expect(page).toHaveURL(/#certificate$/);
    await page.getByRole('link', { name: '🔧Skills' }).click();
    await expect(page).toHaveURL(/#skills$/);
    await page.getByRole('button', { name: 'Let\'s Connect' }).click();
    await expect(page).toHaveURL(/#contact$/);
    await page.getByRole('link', { name: '🏠Home' }).click();
    await expect(page).toHaveURL(/#home$/);

});

test('Verify that the Work Experience is visible', async ({ page }) => {

    await page.goto(baseUrl)
    await page.getByRole('link', { name: '💻Work' }).click()
    await expect(page.getByText("Work Experience"))

});

test('Verify that the Certificates are visible', async ({ page }) => {

    await page.goto(baseUrl)
    await page.getByRole('link', { name: '🏆Certificates' }).click()
    await expect(page.locator('div').filter({ hasText: '🏆Certificates' }))

});

test('Verify that the Skills are visible', async ({ page }) => {

    await page.goto(baseUrl)
    await page.getByRole('link', { name: '🔧Skills' }).click();
    await expect(page.locator('div').filter({ hasText: '🔧Skills' }))

});

test('Verify that the Contacts are visible', async ({ page }) => {

    await page.goto(baseUrl)
    await page.getByRole('button', { name: 'Let\'s Connect' }).click();
    await expect(page.getByRole('heading', { name: '📞Contact Me' }))

});

test('Verify that the minigame are visible', async ({ page }) => {

    await page.goto(baseUrl)
    await page.getByRole('link', { name: '🏠Home' }).click();
    await expect(page.locator('embed').contentFrame().locator('#gameVideo'))

});