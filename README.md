# Jest Puppeteer Example
This repo demonstrates how to connect to and test a website using `jest-puppeteer` by 
connecting to and attempting to apply for a job at AngelList

# Usage
```
npm install
npm test
```

## Optional configuration
I added another script to run without headless Chrome and you can watch the test run. 
You can also set debug in your test file (read the docs) and allow you to step through 
execution in devtools as needed.
```
npm run test:voyeur
```

# DIY - setup your own
Normally I'd leverage TypeScript but for simplicity I'll just share a bootstrapped 
approach to setting up automated browser testing

## Install
```
npm install --save-dev jest-puppeteer puppeteer jest
```

## Configure
 1. Edit `package.json` and add Jest configuration `preset`
```json
  // ...
  "scripts": {
    "test": "jest --runInBand"
  },
  "jest": {
    "preset": "jest-puppeteer"
  },
  "devDependencies": {},
  // ...
```

 2. Add `jest-puppeteer.config.js` configuration file to root dir (same as package.json)
```javascript
module.exports = {
  launch: {
    dumpio: false,
    headless: process.env.HEADLESS !== 'false',   // export HEADLESS=false to launch Chromium
    devtools: true,                               // optionally display devtools in non-headless mode
    defaultViewport: {                            // override default 800x600 pixel browser setting
      width: 1024,
      height: 768
    }
  }
};
```

## Write Your Tests
After this setup, you should be able to write your tests. The `preset` configuration instantiates puppeteer and sets 
global `browser` and `page` variables that you can reference from your tests.

For simplicity and to avoid any additional configs, I'll just add a `src/` directory and within a `__tests__` directory 
and name my test file with `spec` or `test` in the name. This way Jest will detect and run it automatically.
