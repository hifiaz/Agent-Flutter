# Cursor Agent Configuration

## Overview

This folder contains Cursor-specific configurations for the Flutter Agent system.

## Files

- `.cursorrules` - Cursor rules for project context
- `SKILL.md` - Agent instructions

## Usage

When Cursor loads this project, it will automatically:
1. Read `.cursorrules` for project context
2. Suggest completions based on agent system
3. Enable slash commands for common operations

## Slash Commands

Type `/` in Cursor to access:
- `flutter-create` - Create new project
- `flutter-status` - Show pipeline status
- `flutter-agent` - Run specific agent
- `flutter-resume` - Resume from checkpoint
- `flutter-revise` - Request revision

## Tab Autocomplete

Cursor will suggest:
- Agent names when typing `run agent`
- Checkpoint names when typing `resume checkpoint`
- Project names when typing `create flutter`

## @ Mentions

Use `@` to reference:
- `@manifest.json` - Project configuration
- `@shared/state.json` - Pipeline state
- `@agents/research/SKILL.md` - Research agent config