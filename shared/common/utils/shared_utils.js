/**
 * Shared Utility Functions - Cross-tool Compatibility
 */

const fs = require('fs');
const path = require('path');

/**
 * Load and parse manifest.json
 */
function loadManifest(projectPath) {
  const manifestPath = path.join(projectPath, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Manifest not found at ${manifestPath}`);
  }
  return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
}

/**
 * Update shared state
 */
function updateState(projectPath, updates) {
  const statePath = path.join(projectPath, '../../shared/state.json');
  const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
  Object.assign(state, updates);
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
}

/**
 * Create agent message
 */
function createMessage(from, to, type, payload) {
  return {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    from,
    to,
    type,
    payload,
    status: type === 'RESULT' ? 'COMPLETED' : 'PENDING',
    timestamp: new Date().toISOString()
  };
}

/**
 * Validate project structure
 */
function validateProject(projectPath) {
  const requiredDirs = ['lib', 'test', 'assets'];
  const requiredFiles = ['pubspec.yaml', 'manifest.json'];

  const errors = [];

  for (const dir of requiredDirs) {
    if (!fs.existsSync(path.join(projectPath, dir))) {
      errors.push(`Missing directory: ${dir}`);
    }
  }

  for (const file of requiredFiles) {
    if (!fs.existsSync(path.join(projectPath, file))) {
      errors.push(`Missing file: ${file}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Get agent config
 */
function getAgentConfig(agentName) {
  const configPath = path.join(__dirname, '../../agents', agentName, 'SKILL.md');
  if (!fs.existsSync(configPath)) {
    throw new Error(`Agent config not found: ${agentName}`);
  }
  return fs.readFileSync(configPath, 'utf8');
}

/**
 * Create checkpoint
 */
function createCheckpoint(agentName, checkpointId, results, needsApproval) {
  return {
    type: 'CHECKPOINT',
    payload: {
      checkpoint_id: checkpointId,
      agent: agentName,
      results,
      needs_approval: needsApproval,
      timestamp: new Date().toISOString()
    }
  };
}

/**
 * Check threshold
 */
function checkThreshold(actual, threshold) {
  if (typeof threshold === 'number') {
    return actual >= threshold;
  }
  if (typeof threshold === 'object') {
    return Object.entries(threshold).every(([key, value]) => {
      return actual[key] <= value;
    });
  }
  return false;
}

module.exports = {
  loadManifest,
  updateState,
  createMessage,
  validateProject,
  getAgentConfig,
  createCheckpoint,
  checkThreshold
};