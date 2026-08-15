import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('/');
    await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
})

test('Verify that all the navigation links are working', async ({ page }) => {

    await page.getByRole('link', { name: 'Home' }).click({ force: true });
    await expect(page.locator('#home')).toBeInViewport();
    await page.getByRole('link', { name: 'Work' }).click({ force: true });
    await expect(page.locator('#work')).toBeInViewport();
    await page.getByRole('link', { name: 'Certificates' }).click({ force: true });
    await expect(page.locator('#certificate')).toBeInViewport();
    await page.getByRole('link', { name: 'Skills' }).click({ force: true });
    await expect(page.locator('#skills')).toBeInViewport();    
    await page.getByRole('link', { name: 'Let\'s Connect' }).click({ force: true });
    await expect(page.locator('#contact')).toBeInViewport();   
    await page.getByRole('link', { name: 'Home' }).click({ force: true });
    await expect(page.locator('#home')).toBeInViewport();
});

test('Verify that the Work Experience is visible', async ({ page }) => {

    await page.getByRole('link', { name: 'Work' }).click()
    await expect(page.getByText("Work Experience")).toBeInViewport();

});

test('Verify that the Certificates are visible', async ({ page }) => {

    await page.getByRole('link', { name: 'Certificates' }).click()
    await expect(page.getByRole('heading', { name: 'Certificates' })).toBeInViewport();

});

test('Verify that the Certificates fit a mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    const certificateSection = page.locator('#certificate');
    const certificateList = page.locator('#certificate .bg-white');
    await certificateList.scrollIntoViewIfNeeded();

    await expect(certificateList).toBeVisible();
    expect(await certificateList.evaluate((element) => element.scrollWidth))
        .toBeLessThanOrEqual(await certificateList.evaluate((element) => element.clientWidth));

    const workContentBottom = await page.locator('#work .shadow-md').evaluate((element) => element.getBoundingClientRect().bottom);
    const certificateTop = await certificateSection.evaluate((element) => element.getBoundingClientRect().top);
    const certificateBottom = await certificateSection.evaluate((element) => element.getBoundingClientRect().bottom);
    const skillsTop = await page.locator('#skills').evaluate((element) => element.getBoundingClientRect().top);
    const skillsContentBottom = await page.locator('#skills .card').evaluate((element) => element.getBoundingClientRect().bottom);
    const contactTop = await page.locator('#contact').evaluate((element) => element.getBoundingClientRect().top);
    expect(workContentBottom).toBeLessThanOrEqual(certificateTop);
    expect(certificateBottom).toBeLessThanOrEqual(skillsTop);
    expect(skillsContentBottom).toBeLessThanOrEqual(contactTop);
});

test('Verify that the Skills are visible', async ({ page }) => {

    await page.getByRole('link', { name: 'Skills' }).click();
    await expect(page.getByRole('heading', { name: 'Skills' })).toBeInViewport();

});

test('Verify that the Contacts are visible', async ({ page }) => {

    await page.getByRole('link', { name: 'Let\'s Connect' }).click({ force: true });
    await expect(page.getByRole('heading', { name: 'Contact Me' })).toBeInViewport();

});

test('Verify that the minigame are visible', async ({ page }) => {

    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page.locator('#home iframe')).toBeInViewport();

});

test('Verify that the mobile navigation closes after selecting a section', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    const menuButton = page.getByRole('button', { name: 'Toggle navigation menu' });
    const mobileMenu = page.locator('#mobile-menu');

    await menuButton.click();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    await expect(mobileMenu).toBeVisible();

    await mobileMenu.getByRole('link', { name: 'Work' }).click();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await expect(mobileMenu).toBeHidden();
});

test('Verify that the portfolio remains usable on narrow screens', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await expect(page.locator('#home h1')).toHaveCount(0);
    expect(await page.locator('a button').count()).toBe(0);
    expect(await page.locator('button a').count()).toBe(0);

    const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const viewportWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(documentWidth).toBeLessThanOrEqual(viewportWidth);
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

    const [robots, sitemap, minigame, manifest] = await Promise.all([
        page.request.get('/robots.txt'),
        page.request.get('/sitemap.xml'),
        page.request.get('/minigame/Portfolio/index.html'),
        page.request.get('/manifest.json'),
    ]);
    expect(robots.ok()).toBeTruthy();
    expect(await robots.text()).toContain('Sitemap: https://mantojoshua.github.io/sitemap.xml');
    expect(sitemap.ok()).toBeTruthy();
    expect(await sitemap.text()).toContain('https://mantojoshua.github.io/');
    expect(minigame.ok()).toBeTruthy();
    expect(await minigame.text()).toContain('name="robots" content="noindex, follow"');
    expect(manifest.ok()).toBeTruthy();
    expect(await manifest.json()).toMatchObject({
        name: 'Joshua Manto Portfolio',
        theme_color: '#020617',
        background_color: '#020617',
    });
});