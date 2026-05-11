---
name: research
description: Analyzes app market, competitors, suggests features and tech stack for Flutter projects
---

# Research Agent

## Overview
The Research Agent analyzes the app market, identifies competitors, and provides feature recommendations and tech stack suggestions for Flutter projects.

## Responsibilities

1. **Competitor Analysis**
   - Search App Store and Play Store for similar apps
   - Identify top apps in the category
   - Analyze common features and patterns

2. **Feature Matrix Generation**
   - Suggest must-have features based on competitor analysis
   - Identify nice-to-have features
   - Prioritize features by importance (MVP vs nice-to-have)

3. **Tech Stack Recommendation**
   - Suggest Flutter packages and libraries
   - Recommend state management approach
   - Identify navigation patterns
   - Suggest backend/integration options

## Input

From Orchestrator:
```json
{
  "type": "REQUEST",
  "payload": {
    "project_name": "todo_app",
    "description": "Task management app",
    "platforms": ["ios", "android", "web"],
    "payment": "revenuecat"
  }
}
```

## Output

To Orchestrator:
```json
{
  "type": "RESULT",
  "payload": {
    "app_type": "task-management",
    "similar_apps": [
      {"name": "Todoist", "platforms": "ios,android,web"},
      {"name": "Things 3", "platforms": "ios,mac"},
      {"name": "Notion", "platforms": "ios,android,web"}
    ],
    "features": [
      {"name": "task_crud", "priority": "must-have", "complexity": "low"},
      {"name": "due_dates", "priority": "must-have", "complexity": "low"},
      {"name": "categories_tags", "priority": "must-have", "complexity": "medium"},
      {"name": "collaboration", "priority": "nice-to-have", "complexity": "high"},
      {"name": "ai_suggestions", "priority": "nice-to-have", "complexity": "high"}
    ],
    "tech_stack": {
      "state_management": "flutter_bloc",
      "navigation": "go_router",
      "local_storage": "isar",
      "api_client": "dio",
      "ui_components": "flutter_material"
    },
    "subscription_tiers": [
      {"name": "free", "features": ["basic_tasks", "due_dates"]},
      {"name": "premium", "features": ["categories", "collaboration", "reminders"]}
    ]
  }
}
```

## Research Categories

| App Type | Similar Apps | Common Features |
|----------|--------------|-----------------|
| todo | Todoist, Things, Notion | CRUD, due dates, categories, collaboration |
| e-commerce | Shopee, Tokopedia | Product catalog, cart, checkout, orders |
| social | Instagram, Twitter | Profile, feed, posts, comments, likes |
| fitness | Strava, MyFitnessPal | Tracking, goals, charts, social |
| finance | Wise, Revolut | Accounts, transactions, charts, budgets |

## Tech Stack Recommendations

### State Management
- **flutter_bloc**: Best for complex apps with many states
- **riverpod**: Good for medium complexity, great DX
- **getx**: Quick prototyping, less boilerplate
- **provider**: Simple apps, built-in Flutter support

### Navigation
- **go_router**: Official recommendation, deep linking support
- **beamer**: Declarative routing, browser history support

### Database
- **isar**: Fast, offline-first, sync-ready
- **hive**: Simple, lightweight, no native deps
- **sqflite**: SQL for complex queries
- **drift**: Type-safe SQL, reactive streams

### Networking
- **dio**: Full-featured HTTP client, interceptors
- **http**: Simple requests, built-in

### Authentication
- **firebase_auth**: Google, Apple, email/password
- **supabase**: Auth + Database + Storage

## Checkpoint

After research completes, send CHECKPOINT to Orchestrator:
```json
{
  "type": "CHECKPOINT",
  "payload": {
    "checkpoint_id": "checkpoint_1",
    "results": "research_results",
    "needs_approval": true
  }
}
```