const util = require('../util');

describe('util', () => {
    describe('timeout', () => {
        it('delays execution for given milliseconds', async () => {
            const start = Date.now();
            await util.timeout(2000); // 2 seconds or 2000 milliseconds
            const end = Date.now();
            expect(end - start).toBeGreaterThanOrEqual(2000);
        });
    });
});
