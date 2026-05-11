---
name: design
description: Generates app assets (icons, splash screen, illustrations) using SDXL via Pinokio
---

# Design Agent

## Overview
The Design Agent generates app assets including icons, splash screens, and illustrations using SDXL AI model via Pinokio.

## Responsibilities

1. **Icon Generation**
   - App icon (1024x1024 for iOS, adaptive for Android)
   - Feature icons
   - Navigation icons

2. **Splash Screen**
   - Generate splash screen with app logo
   - Create loading animation assets

3. **Illustrations**
   - Empty state illustrations
   - Onboarding illustrations
   - Error state illustrations

4. **Asset Optimization**
   - Convert to appropriate formats (PNG, SVG)
   - Generate required sizes
   - Optimize for mobile

## Input

From Orchestrator:
```json
{
  "type": "REQUEST",
  "payload": {
    "project_name": "todo_app",
    "app_type": "task-management",
    "brand_colors": ["#4A90E2", "#FFFFFF", "#2C3E50"],
    "style": "modern-minimal",
    "platforms": ["ios", "android", "web"]
  }
}
```

## SDXL Integration via Pinokio

### Pinokio API
- Uses `pterm` commands for SDXL control
- Generates images via SDXL model
- Returns image assets

### Prompt Template
```json
{
  "prompt": "app icon for [app_name], [style], clean design, [colors] gradient background, no text",
  "negative_prompt": "blurry, low quality, text, watermark",
  "width": 1024,
  "height": 1024,
  "steps": 30,
  "guidance_scale": 7.5
}
```

## Output Structure

```
projects/[name]/assets/
├── icons/
│   ├── app_icon.png (1024x1024)
│   ├── app_icon_ios.png
│   ├── app_icon_android.png
│   └── feature_icons/
│       ├── add.png
│       ├── delete.png
│       └── settings.png
├── splash/
│   ├── splash_screen.png
│   └── splash_logo.png
├── illustrations/
│   ├── empty_state.png
│   ├── onboarding_1.png
│   ├── onboarding_2.png
│   └── error_state.png
└── colors/
    └── theme.json
```

## Asset Specifications

| Asset | iOS | Android | Web |
|-------|-----|---------|-----|
| App Icon | 1024x1024, 180x180 @3x | 512x512, adaptive | favicon.ico |
| Splash | 2732x2732 | 1280x720 | N/A |
| Feature Icons | 60x60 @3x | 48x48 | SVG |

## Style Guides

### Modern Minimal
- Clean lines, ample whitespace
- Soft shadows, subtle gradients
- Sans-serif typography
- Primary color focus

### Playful
- Rounded corners, bouncy animations
- Vibrant colors
- Fun illustrations
- Friendly UI

### Professional
- Sharp edges, structured layout
- Muted colors, corporate feel
- Data-focused visuals
- Enterprise aesthetics

## Checkpoint

After design generation:
```json
{
  "type": "CHECKPOINT",
  "payload": {
    "checkpoint_id": "checkpoint_2",
    "artifacts": ["assets/icons/", "assets/splash/", "assets/illustrations/"],
    "needs_approval": false
  }
}
```