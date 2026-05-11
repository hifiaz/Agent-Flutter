# Design Agent Protocols

## SDXL Image Generation Protocol

1. **Check Pinokio Status**
   ```bash
   pterm status sdxl
   ```
   If not running, launch SDXL via Pinokio

2. **Prepare Prompt**
   - Template: `{app_name}_{asset_type}_{style}`
   - Include brand colors
   - Add negative prompt to avoid quality issues

3. **Generate Image**
   ```json
   {
     "prompt": "modern app icon for task manager, minimal design, blue gradient, no text",
     "negative_prompt": "blurry, low quality, text, watermark, complex",
     "width": 1024,
     "height": 1024,
     "steps": 30
   }
   ```

4. **Save Output**
   - Save to `assets/[type]/`
   - Generate required sizes
   - Create placeholder if generation fails

## App Icon Protocol

1. **Primary Icon**
   - 1024x1024 PNG
   - Transparent background
   - Logo centered
   - Consistent with brand

2. **iOS Sizes**
   - 20x20 @1x, @2x, @3x
   - 29x29 @1x, @2x, @3x
   - 40x40 @1x, @2x, @3x
   - 60x60 @2x, @3x
   - 76x76 @1x, @2x
   - 83.5x83.5 @2x
   - 1024x1024 (App Store)

3. **Android Sizes**
   - mipmap-mdpi: 48x48
   - mipmap-hdpi: 72x72
   - mipmap-xhdpi: 96x96
   - mipmap-xxhdpi: 144x144
   - mipmap-xxxhdpi: 192x192
   - playstore-icon: 512x512

## Splash Screen Protocol

1. **Generate Splash**
   - App logo centered
   - Brand background color
   - Clean, simple design

2. **Platform Specs**
   - iOS: 2732x2732 @3x (launch image)
   - Android: 1280x720 (landscape) + 720x1280 (portrait)

## Illustration Protocol

1. **Empty State**
   - Friendly, encouraging imagery
   - Related to app function
   - Light, airy feel

2. **Onboarding**
   - 3 illustrations
   - Progressive complexity
   - Consistent style

3. **Error State**
   - Humor where appropriate
   - Clear, not alarming
   - Actionable

## Style Templates

### Modern Minimal
```
Primary: #4A90E2
Background: #FFFFFF
Accent: #50C878
```

### Playful
```
Primary: #FF6B6B
Background: #FFE66D
Accent: #4ECDC4
```

### Professional
```
Primary: #2C3E50
Background: #ECF0F1
Accent: #3498DB
```