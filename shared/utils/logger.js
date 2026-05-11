/**
 * Logger Utility
 * Unified logging for all agents
 */

const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(__dirname, '../../logs');
const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

const LEVELS = {
  INFO: { color: 'blue', symbol: 'ℹ' },
  SUCCESS: { color: 'green', symbol: '✅' },
  WARNING: { color: 'yellow', symbol: '⚠️' },
  ERROR: { color: 'red', symbol: '❌' },
  DEBUG: { color: 'gray', symbol: '🔍' }
};

class Logger {
  constructor(agent) {
    this.agent = agent;
    this.logFile = path.join(LOG_DIR, `${agent}_${Date.now()}.log`);
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }

  _format(level, message) {
    const timestamp = new Date().toISOString();
    const { color, symbol } = LEVELS[level] || LEVELS.INFO;
    return `[${timestamp}] [${this.agent}] ${symbol} ${message}`;
  }

  _write(level, message) {
    const formatted = this._format(level, message);
    console.log(`${COLORS[LEVELS[level]?.color || 'blue']}${formatted}${COLORS.reset}`);

    // Also write to file
    fs.appendFileSync(this.logFile, formatted + '\n');
  }

  info(message) {
    this._write('INFO', message);
  }

  success(message) {
    this._write('SUCCESS', message);
  }

  warning(message) {
    this._write('WARNING', message);
  }

  error(message) {
    this._write('ERROR', message);
  }

  debug(message) {
    this._write('DEBUG', message);
  }
}

module.exports = Logger;