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
