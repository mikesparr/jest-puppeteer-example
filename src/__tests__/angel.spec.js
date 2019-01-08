const util = require('../lib/util');
const faker = require('faker');

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

    describe('onboarding', () => {
        const formSelector = 'form[action^="/"]';
        const submitSelector = 'input[name="commit"]';
        const reasonSelector = 'input[name="reason"]';
        const feedbackSelector = 'textarea[name="feedback"]';
        const passwordSelector = 'input[name="password"]';

        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const fullName = `${firstName} ${lastName}`;
        const email = faker.internet.email();
        const pass = faker.internet.password();

        it('should click "Find a Startup Job" link', async () => {
            await expect(page).toClick('a', { text: 'Find a Startup Job', waitUntil: 'domcontentloaded' });
            await page.waitFor(500); // allow enough time for new page to load
            await expect(page).toMatch('Email Sign Up');
        });
    
        it('should fail with too short of password', async () => {
            const formSelector = 'form[action^="/"]';
            const submitSelector = 'input[name="commit"]';
    
            await expect(page).toFillForm(formSelector, {
                ['user[name]']: faker.name.findName(),
                ['user[email]']: faker.internet.email(),
                ['user[password]']: 'oops'
            });
            await page.click(submitSelector);
            await page.waitFor(500);
            await expect(page).toMatch('Password is too short (minimum is 8 characters)');
            await util.timeout(1000); // just so you can see if in voyeur mode
        });
    
        it('should create a new account and greet by first name', async () => {
            await page.reload();
            await expect(page).toFillForm(formSelector, {
                ['user[name]']: fullName,
                ['user[email]']: email,
                ['user[password]']: pass
            });
            await page.click(submitSelector);
            await page.waitFor(500);
            await expect(page).toMatch(`Profile`);
            await util.timeout(1000); // just so you can see it if in voyeur mode
        });
    
        it('should delete fake account', async () => {
            await page.goto('https://angel.co/settings');
            await expect(page).toClick('a', { text: 'Delete account' });
            await expect(page).toSelect(reasonSelector, 'other');
            await expect(page).toFill(feedbackSelector, 'I was just testing this out but have another account. Sorry for trouble.');
            await expect(page).toClick('a', { text: 'Continue' });
            await page.waitFor(1000);
            await expect(page).toMatch('Last step before you delete your account..');
            await expect(page).toFill(passwordSelector, pass);
            await page.click(submitSelector);
            await util.timeout(1000); // just so you can see it if in voyeur mode
        });
    });
});
