/**
 * Size Check Test
 * Ensures the framework stays within size budget
 */

const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const MAX_SIZE_UNCOMPRESSED = 15 * 1024; // 15KB
const MAX_SIZE_GZIPPED = 5 * 1024; // 5KB

const distPath = path.join(__dirname, '../dist');
const files = ['ragi.css', 'ragi.min.css'];

console.log('📊 Ragi CSS - Size Check\n');

let allPassed = true;

files.forEach((file) => {
  const filePath = path.join(distPath, file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file} - Not found (skipping)`);
    return;
  }

  const content = fs.readFileSync(filePath);
  const uncompressedSize = content.length;
  const gzippedSize = zlib.gzipSync(content).length;

  console.log(`\n${file}:`);
  console.log(`  Uncompressed: ${(uncompressedSize / 1024).toFixed(2)} KB`);
  console.log(`  Gzipped: ${(gzippedSize / 1024).toFixed(2)} KB`);

  // Check uncompressed size
  if (uncompressedSize > MAX_SIZE_UNCOMPRESSED) {
    console.log(`  ❌ FAIL: Uncompressed size exceeds ${MAX_SIZE_UNCOMPRESSED / 1024}KB`);
    allPassed = false;
  } else {
    const remaining = MAX_SIZE_UNCOMPRESSED - uncompressedSize;
    console.log(`  ✅ PASS: ${(remaining / 1024).toFixed(2)} KB remaining`);
  }

  // Check gzipped size
  if (gzippedSize > MAX_SIZE_GZIPPED) {
    console.log(`  ❌ FAIL: Gzipped size exceeds ${MAX_SIZE_GZIPPED / 1024}KB`);
    allPassed = false;
  } else {
    const remaining = MAX_SIZE_GZIPPED - gzippedSize;
    console.log(`  ✅ PASS: ${(remaining / 1024).toFixed(2)} KB remaining (gzipped)`);
  }
});

console.log('\n' + '='.repeat(50));
if (allPassed) {
  console.log('✅ All size checks passed!');
  process.exit(0);
} else {
  console.log('❌ Size budget exceeded!');
  process.exit(1);
}
