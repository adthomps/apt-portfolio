const fs = require('fs');
const path = require('path');

const prodUrl = 'https://apt-portfolio.apt-account.workers.dev/'; // <-- Set your actual prod URL here
const configPath = path.resolve(__dirname, '../playwright.config.ts');
let config = fs.readFileSync(configPath, 'utf8');
config = config.replace(/baseURL: 'http:\/\/localhost:\d+'/, `baseURL: '${prodUrl}'`);
config = config.replace(/url: 'http:\/\/localhost:\d+'/, `url: '${prodUrl}'`);
fs.writeFileSync(configPath, config);
console.log(`Playwright config updated for production: https://apt-portfolio.apt-account.workers.dev/`);
