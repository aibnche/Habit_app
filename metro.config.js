const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 1. Keep your CJS support
config.resolver.sourceExts.push('cjs');

// 2. CRITICAL: Disable package exports to allow Firebase to find the RN bundle
config.resolver.unstable_enablePackageExports = false;

module.exports = config;