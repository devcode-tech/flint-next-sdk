const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

function generateSRI(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha384').update(fileBuffer).digest('base64');
  return `sha384-${hash}`;
}

const sdkPath = path.join(__dirname, '../dist/flint-form.js');
const sri = generateSRI(sdkPath);

console.log('\n🔒 Subresource Integrity Hash:');
console.log(`integrity="${sri}"\n`);

// Update example.html with SRI hash
const examplePath = path.join(__dirname, '../public/example.html');
let html = fs.readFileSync(examplePath, 'utf8');
html = html.replace(/integrity="[^"]*"/, `integrity="${sri}"`);
fs.writeFileSync(examplePath, html);

console.log('✅ Updated example.html with SRI hash\n');