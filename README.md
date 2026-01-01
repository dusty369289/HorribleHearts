# Horrible Hearts - Card Game Score Tracker

A mobile-friendly React application for tracking scores in card games like Hearts, with built-in round sum verification to ensure accurate scoring.

## Overview

Horrible Hearts is a score tracking app designed for card games where players accumulate points across multiple rounds. The app's key feature is its ability to verify that the sum of all players' scores for a round matches an expected total, helping catch arithmetic errors during gameplay.

## Features

### Core Functionality

- **Player Management**
  - Add unlimited players with custom names and color-coded cards
  - Edit player names and colors at any time
  - Delete players from the game
  - Persistent storage - your game state is saved automatically

- **Score Tracking**
  - Individual score cards for each player
  - Temporary score input for each round
  - One-click score submission for all players
  - Automatic score accumulation across rounds
  - Visual feedback with color-coded player cards

- **Round Sum Verification**
  - Set an expected sum for each round (e.g., 26 for Hearts)
  - Automatic verification when submitting scores
  - Warning modal if scores don't match the expected total
  - Option to override and submit anyway
  - Toggle sum checking on/off as needed

- **Smart Sorting**
  - Automatically sort players by total score after each round
  - Toggle between ascending (low to high) and descending (high to low)
  - Players reorder automatically to show current standings

- **Game Reset**
  - Reset all scores to zero
  - Update the expected round sum for the next game
  - Keeps players but clears all scoring history

### User Interface

- **Responsive Design**: Automatically adjusts card heights to fit all players on screen
- **Touch-Optimized**: Large buttons and controls for easy mobile use
- **Visual Feedback**: Color-coded player cards for quick identification
- **Hold-to-Repeat**: Hold +/- buttons for rapid score adjustment with acceleration
- **Fullscreen Layout**: Uses entire viewport with 80% center area for cards, 10% margins for controls

### Controls Layout

**Left Side (10% width)**
- Top: Add Player button
- Bottom: Reset Game button

**Right Side (10% width)**
- Top: Sort toggle (Low→High / High→Low)
- Bottom: Submit All Scores button

**Center (80% width)**
- Player score cards with individual controls

## File Structure

```
src/
├── App.jsx                 # Main app component, routing between screens
├── main.jsx                # App entry point
├── index.css               # Global styles
├── components/
│   └── PlayerCard.jsx      # Individual player score card with controls
├── pages/
│   ├── Game.jsx            # Main game screen with all players
│   ├── AddPlayer.jsx       # Screen for adding new players
│   └── EditPlayer.jsx      # Screen for editing existing players
├── hooks/
│   └── useLocalStorage.js  # Custom hook for persistent data storage
└── assets/                 # Icons and images
```

## Component Details

### App.jsx
Main application component that manages:
- Screen navigation (game, addPlayer, editPlayer)
- Player state management
- LocalStorage persistence
- Initial setup with 2 placeholder players

### Game.jsx
The primary game interface featuring:
- Dynamic card layout that adapts to player count
- Score submission with sum verification
- Player sorting functionality
- Reset confirmation modal
- Sum mismatch warning modal
- Configurable round sum and sum check toggle

### PlayerCard.jsx
Individual player score card with:
- Current total score display
- Temporary round score input
- +/- controls with hold-to-repeat acceleration
- Click to edit player details
- Color-coded background
- Animated layout transitions

### AddPlayer.jsx & EditPlayer.jsx
Player management screens with:
- On-screen keyboard for name input
- Color picker (10 preset colors)
- Name length limit (10 characters)
- Delete player option (EditPlayer only)

### useLocalStorage.js
Custom React hook providing:
- Automatic localStorage synchronization
- JSON serialization/deserialization
- Initial value support

## How to Use

1. **Starting a Game**
   - The app starts with 2 placeholder players
   - Click a player card to edit their name and color
   - Add more players using the + button (top left)

2. **Scoring a Round**
   - Use +/- buttons on each player card to enter their round score
   - Hold buttons for rapid input (accelerates over time)
   - Click the ✓ button (bottom right) to submit all scores

3. **Sum Verification**
   - Before resetting, set the expected round sum in the reset modal
   - When enabled, the app will warn you if scores don't match the expected sum
   - You can still submit anyway if you choose

4. **Managing Players**
   - Click any player card to edit name/color
   - Use the + button (top left) to add new players
   - Delete players from the edit screen

5. **Resetting for a New Game**
   - Click the reset button (bottom left)
   - Optionally update the expected round sum
   - Toggle sum checking on/off
   - Confirm to reset all scores to zero

## Technical Details

- **Framework**: React 18 with Vite
- **Styling**: Inline styles with responsive viewport units
- **State Management**: React hooks (useState, useEffect, useRef)
- **Persistence**: Browser localStorage
- **Animation**: Framer Motion for smooth card reordering
- **Build Tool**: Vite for fast development and optimized builds

## Installation & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Browser Compatibility

Works in all modern browsers with localStorage and ES6+ support. Optimized for mobile devices and touch interfaces.

## Future Enhancements

Potential features for future versions:
- Multiple game type presets (Hearts, Spades, etc.)
- Score history and round-by-round breakdown
- Undo last round
- Game statistics and analytics
- Export/import game data
- Dark mode theme
