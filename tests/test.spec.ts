import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('/');
    await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
})

test('Verify that all the navigation links are working', async ({ page }) => {

    await page.getByRole('link', { name: '🏠Home' }).click({ force: true });
    await expect(page.locator('#home')).toBeInViewport();
    await page.getByRole('link', { name: '💻Work' }).click({ force: true });
    await expect(page.locator('#work')).toBeInViewport();
    await page.getByRole('link', { name: '🏆Certificates' }).click({ force: true });
    await expect(page.locator('#certificate')).toBeInViewport();
    await page.getByRole('link', { name: '🔧Skills' }).click({ force: true });
    await expect(page.locator('#skills')).toBeInViewport();    
    await page.getByRole('button', { name: 'Let\'s Connect' }).click({ force: true });
    await expect(page.locator('#contact')).toBeInViewport();   
    await page.getByRole('link', { name: '🏠Home' }).click({ force: true });
    await expect(page.locator('#home')).toBeInViewport();
});

test('Verify that the Work Experience is visible', async ({ page }) => {

    await page.getByRole('link', { name: '💻Work' }).click()
    await expect(page.getByText("Work Experience")).toBeInViewport();

});

test('Verify that the Certificates are visible', async ({ page }) => {

    await page.getByRole('link', { name: '🏆Certificates' }).click()
    await expect(page.getByRole('heading', { name: '🏆Certificates' })).toBeInViewport();

});

test('Verify that the Skills are visible', async ({ page }) => {

    await page.getByRole('link', { name: '🔧Skills' }).click();
    await expect(page.getByRole('heading', { name: '🔧Skills' })).toBeInViewport();

});

test('Verify that the Contacts are visible', async ({ page }) => {

    await page.getByRole('button', { name: 'Let\'s Connect' }).click({ force: true });
    await expect(page.getByRole('heading', { name: '📞Contact Me' })).toBeInViewport();

});

test('Verify that the minigame are visible', async ({ page }) => {

    await page.getByRole('link', { name: '🏠Home' }).click();
    await expect(page.locator('#home iframe')).toBeInViewport();

});

test('Expose crawlable portfolio metadata and discovery files', async ({ page }) => {
    await expect(page).toHaveTitle('Joshua Manto | Software Developer & QA Professional');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        'content',
        /software developer and quality assurance professional/i
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        'https://mantojoshua.github.io/'
    );
    await expect(page.locator('main')).toHaveCount(1);

    const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
    expect(JSON.parse(structuredData ?? '')).toMatchObject({
        '@context': 'https://schema.org',
        '@graph': expect.arrayContaining([
            expect.objectContaining({ '@type': 'Person', name: 'Joshua Manto' }),
            expect.objectContaining({ '@type': 'ProfilePage' }),
        ]),
    });

    const [robots, sitemap, minigame] = await Promise.all([
        page.request.get('/robots.txt'),
        page.request.get('/sitemap.xml'),
        page.request.get('/minigame/Portfolio/index.html'),
    ]);
    expect(robots.ok()).toBeTruthy();
    expect(await robots.text()).toContain('Sitemap: https://mantojoshua.github.io/sitemap.xml');
    expect(sitemap.ok()).toBeTruthy();
    expect(await sitemap.text()).toContain('https://mantojoshua.github.io/');
    expect(minigame.ok()).toBeTruthy();
    expect(await minigame.text()).toContain('name="robots" content="noindex, follow"');
});