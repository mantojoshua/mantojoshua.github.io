import { test, expect } from '@playwright/test';

test('Verify that all the navigation links are working', async ({ page }) => {

await page.goto('https://mantojoshua.github.io/');
await page.getByRole('link', { name: '🏠Home' }).click();
await page.getByRole('link', { name: '💻Work' }).click();
await page.getByRole('link', { name: '🏆Certificates' }).click();
await page.getByRole('link', { name: '🔧Skills' }).click();
await page.getByRole('button', { name: 'Let\'s Connect' }).click();
await page.getByRole('link', { name: '🏠Home' }).click();

});