#!/usr/bin/env bash

# Agent Flutter Entry Point

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is required but not installed."
    exit 1
fi

# Run the CLI
node "$SCRIPT_DIR/cli.js" "$@"