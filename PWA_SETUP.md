# PWA Setup Instructions

## What I've Added

1. **manifest.json** - Defines your app as installable with metadata
2. **HTML meta tags** - Provides iOS and Android support
3. **Install prompt** - Shows a banner prompting users to install the app

## Next Steps: Create Your App Icons

You need to create two icon files and place them in the `public` folder:
- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

### Option 1: Use an Online Icon Generator
1. Visit https://favicon.io/favicon-generator/ or https://realfavicongenerator.net/
2. Create an icon with your desired design (e.g., hearts theme, red background)
3. Download the 192x192 and 512x512 PNG versions
4. Save them as `icon-192.png` and `icon-512.png` in the `public` folder

### Option 2: Create Manually
1. Use any image editor (Photoshop, GIMP, Canva, etc.)
2. Create a square design (recommended: hearts/cards theme)
3. Export as PNG:
   - 192x192px → `public/icon-192.png`
   - 512x512px → `public/icon-512.png`

### Design Tips:
- Use a bold, simple design that's recognizable at small sizes
- Match your app's theme (red/card game aesthetic)
- Avoid small text - it won't be readable
- Consider a heart icon or playing card design

## How It Works

### Install Prompt
- After 3 seconds on the site, users will see an install prompt
- Works on Chrome/Edge (Android) and Safari (iOS 16.4+)
- Users can dismiss or install
- On iOS: Users can also tap Share → "Add to Home Screen"

### Manifest Features
- **Standalone mode**: Opens without browser UI
- **Landscape orientation**: Locks to landscape for gameplay
- **Theme color**: Red (#FF5555) matches your app
- **Custom name**: "Horrible Hearts" on home screen

## Testing

1. **Android Chrome**:
   - Visit your site
   - Wait for install prompt or tap menu → "Install app"
   - Icon appears on home screen

2. **iOS Safari**:
   - Visit your site
   - Tap Share button (bottom middle)
   - Tap "Add to Home Screen"
   - Icon appears on home screen

3. **Desktop**:
   - Chrome shows install icon in address bar
   - Click to install as desktop app

## Current Setup
- Theme color: #FF5555 (red)
- Orientation: Landscape only
- Display: Standalone (fullscreen app)
- Background: #1a1a1a (dark)
