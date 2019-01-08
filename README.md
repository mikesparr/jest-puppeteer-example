# Jest Puppeteer Example
This repo demonstrates how to connect to and test a website using `jest-puppeteer` by 
connecting to and attempting to apply for a job at AngelList

# Usage
```
npm install
npm test
```

# Setup In Your Node Environment
Normally I'd leverage TypeScript but for simplicity I'll just share a bootstrapped approach to setting up automated browser testing

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
