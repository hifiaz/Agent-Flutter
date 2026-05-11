/**
 * Manifest Validator
 * Validates project manifest.json files
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_FIELDS = ['name', 'platforms', 'storage'];
const VALID_PLATFORMS = ['ios', 'android', 'web'];
const VALID_STORAGE = ['local', 'firebase'];
const VALID_PAYMENT = ['revenuecat', null];

function validateManifest(manifestPath) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const errors = [];

  // Check required fields
  for (const field of REQUIRED_FIELDS) {
    if (!manifest[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Validate platforms
  if (manifest.platforms) {
    for (const platform of manifest.platforms) {
      if (!VALID_PLATFORMS.includes(platform)) {
        errors.push(`Invalid platform: ${platform}`);
      }
    }
  }

  // Validate storage
  if (manifest.storage && !VALID_STORAGE.includes(manifest.storage)) {
    errors.push(`Invalid storage mode: ${manifest.storage}`);
  }

  // Validate payment
  if (manifest.payment && !VALID_PAYMENT.includes(manifest.payment)) {
    errors.push(`Invalid payment provider: ${manifest.payment}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// CLI usage
if (require.main === module) {
  const manifestPath = path.join(process.cwd(), 'manifest.json');
  const result = validateManifest(manifestPath);

  if (result.valid) {
    console.log('✅ Manifest is valid');
    process.exit(0);
  } else {
    console.log('❌ Manifest validation failed:');
    result.errors.forEach(e => console.log(`  - ${e}`));
    process.exit(1);
  }
}

module.exports = { validateManifest };