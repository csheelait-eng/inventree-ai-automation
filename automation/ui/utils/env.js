const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env') });

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function optionalEnv(name, fallback) {
  const value = process.env[name];
  return value && value.length > 0 ? value : fallback;
}

module.exports = {
  requireEnv,
  optionalEnv,
};

