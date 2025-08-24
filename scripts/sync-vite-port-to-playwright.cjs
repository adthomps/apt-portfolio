const fs = require('fs');
const path = require('path');

// Read vite config to get port
const viteConfigPath = path.resolve(__dirname, '../vite.config.ts');
const viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
const portMatch = viteConfig.match(/port:\s*(\d+)/);
const port = portMatch ? portMatch[1] : '8080';

// Update playwright.config.ts
const playwrightConfigPath = path.resolve(__dirname, '../playwright.config.ts');
let playwrightConfig = fs.readFileSync(playwrightConfigPath, 'utf8');
playwrightConfig = playwrightConfig.replace(/baseURL:\s*'http:\/\/localhost:\d+'/, `baseURL: 'http://localhost:${port}'`);
playwrightConfig = playwrightConfig.replace(/url:\s*'http:\/\/localhost:\d+'/, `url: 'http://localhost:${port}'`);
fs.writeFileSync(playwrightConfigPath, playwrightConfig);

console.log(`Playwright config updated to use Vite port: ${port}`);
