// scripts/scan-local-build.cjs
// Scans and logs all files in the local build output (dist and dist/.vite)

const fs = require('fs');
const path = require('path');

function scanDir(dir, base = dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const relPath = path.relative(base, fullPath);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(scanDir(fullPath, base));
    } else {
      results.push(relPath);
    }
  }
  return results;
}

function logBuildFiles() {
  const distFiles = scanDir(path.resolve(__dirname, '../dist'));
  const viteFiles = scanDir(path.resolve(__dirname, '../dist/.vite'));
  console.log('--- dist files ---');
  distFiles.forEach(f => console.log(f));
  console.log('--- dist/.vite files ---');
  viteFiles.forEach(f => console.log(f));
  console.log(`Total dist files: ${distFiles.length}`);
  console.log(`Total dist/.vite files: ${viteFiles.length}`);
}

logBuildFiles();
