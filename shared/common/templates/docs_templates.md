# Documentation Templates

## README Template

```markdown
# {project_name}

{project_description}

## Features
{feature_list}

## Tech Stack
{tech_stack_table}

## Getting Started

### Prerequisites
- Flutter SDK 3.10+
- Dart SDK 3.0+

### Installation
```bash
git clone <repo>
cd {project_name}
flutter pub get
flutter run
```

## Supported Platforms
{platforms}

## Supported Languages
{locales}

## Build

### iOS
```bash
flutter build ios --simulator --no-codesign
```

### Android
```bash
flutter build appbundle --release
```

### Web
```bash
flutter build web --release
```

## License
MIT
```

## API Documentation Template

```markdown
# API Documentation

## Table of Contents
{toc}

## Models

### {ModelName}
{class_description}

#### Properties
| Property | Type | Description |
|----------|------|-------------|
{prop_table}

#### Methods
| Method | Parameters | Return | Description |
|--------|------------|--------|-------------|
{method_table}

## Repositories

### {RepositoryName}
{repo_description}

#### Methods
| Method | Parameters | Return | Description |
|--------|------------|--------|-------------|
| getAll | - | Future<List<{Entity}>> | Get all items |
| getById | String id | Future<{Entity}> | Get by ID |
| create | {Entity} | Future<{Entity}> | Create new |
| update | {Entity} | Future<void> | Update existing |
| delete | String id | Future<void> | Delete by ID |

## BLoCs

### {BlocName}
{bloc_description}

#### Events
| Event | Description |
|-------|-------------|
| Load{BlocName} | Load initial data |
| Update{BlocName} | Update data |
| Delete{BlocName} | Delete data |

#### States
| State | Description |
|-------|-------------|
| {BlocName}Initial | Initial state |
| {BlocName}Loading | Loading in progress |
| {BlocName}Loaded | Data loaded successfully |
| {BlocName}Error | Error occurred |
```

## Changelog Template

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [{version}] - {date}

### Added
{added_features}

### Changed
{changed_features}

### Deprecated
{deprecated_features}

### Removed
{removed_features}

### Fixed
{fixed_issues}

### Security
{security_improvements}
```

## Setup Guide Template

```markdown
# Setup Guide

## Prerequisites

### Required
- Flutter SDK 3.10+
- Dart SDK 3.0+
- Git

### Optional
{optional_software}

## Installation

### 1. Clone
```bash
git clone <repo>
cd {project_name}
```

### 2. Install Dependencies
```bash
flutter pub get
```

### 3. Environment
```bash
cp .env.example .env
# Edit with your credentials
```

### 4. Platform Setup
{platform_specific_setup}

## Running

```bash
flutter run -d <device>
```

## Troubleshooting

{common_issues_and_solutions}
```

## Architecture Template

```markdown
# Architecture

## Overview

{project_name} follows clean architecture with the following layers:

```
{architecture_diagram}
```

## Layers

### Presentation
{presentation_description}

### Domain
{domain_description}

### Data
{data_description}

## State Management

{state_management_description}

## Navigation

{navigation_description}

## Data Flow

{data_flow_description}

## Testing Strategy

{testing_strategy}
```