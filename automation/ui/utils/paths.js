const path = require('path');

function repoRoot() {
  // This file lives under automation/ui/utils, so 3 levels up is repo root.
  return path.resolve(__dirname, '..', '..', '..');
}

function storageStatePath() {
  return path.join(repoRoot(), 'automation', 'ui', '.auth', 'storageState.json');
}

module.exports = {
  repoRoot,
  storageStatePath,
};

