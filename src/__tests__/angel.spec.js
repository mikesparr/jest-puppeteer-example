describe('AngelList', () => {
    beforeAll(async () => {
        jest.setTimeout(20000); // allow longer than 5 sec default for page load waits
        await page.goto('https://angel.co', { waitUntil: 'domcontentloaded' });
    });
    
    // disabled by default but remove the 'x' and can configure debug mode globally
    xit('should put test in debug mode', async () => {
        await jestPuppeteer.debug();
    });

    it('should display "Get a Job at a Startup" on homepage', async () => {
        await expect(page).toMatch('Get a Job at a Startup');
    });
});
