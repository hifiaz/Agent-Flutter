# Claude Code Agent Configuration

## Overview

This folder contains Claude-specific configurations for the Flutter Agent system.

## Files

- `CLAUDE.md` - Main Claude project configuration
- `.claude/commands/` - Custom slash commands

## Usage

When Claude Code loads this project, it will automatically read `CLAUDE.md` and register custom commands from `.claude/commands/`.

## Custom Commands

### /flutter-create
Creates a new Flutter project with all agents

### /flutter-status
Shows current pipeline status

### /flutter-agent
Runs a specific agent

### /flutter-resume
Resumes from checkpoint

### /flutter-revise
Requests revision from agent