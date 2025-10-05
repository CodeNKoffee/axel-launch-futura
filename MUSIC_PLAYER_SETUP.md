# Music Player Setup - F1 Soundtrack

## Overview
The music player has been redesigned to be a **vertical sidebar** positioned on the **right side** of the screen, featuring songs from the **F1 Movie Soundtrack** by composer Daniel Pemberton.

## Design Changes

### Layout
- **Position**: Fixed right sidebar (full height)
- **Width**: 320px (80 on Tailwind scale)
- **Style**: Dark futuristic racing theme matching AXEL brand aesthetics

### Visual Features
1. **Racing-themed gradient background** with backdrop blur
2. **Neon blue accent stripe** on the left edge
3. **Dynamic waveform visualization** that animates when playing
4. **Glowing controls** with hover effects using `racing-glow` class
5. **Track playlist** with all F1 soundtrack songs
6. **Professional progress bar** with gradient fill
7. **Volume control** with visual feedback

### Color Scheme
- Primary: Racing Blue (`hsl(var(--primary))` - #2196F3)
- Accent: Racing Green (`hsl(var(--accent))`)
- Background: Black with transparency and blur
- Text: White with varying opacity levels

## F1 Movie Soundtrack Songs

The music player is configured to play tracks from **Daniel Pemberton's F1 Movie Soundtrack**. 

### Required Song Files
Place these MP3 files in `/public/songs/`:

1. `Main Titles.mp3` - Opening theme
2. `Race Ready.mp3` - Pre-race tension
3. `Lights Out.mp3` - Race start sequence
4. `Full Throttle.mp3` - High-speed action
5. `Apex Legends.mp3` - Cornering excellence
6. `Podium Finish.mp3` - Victory celebration

### Where to Get the Songs
- **Spotify**: [Daniel Pemberton - F1 Soundtrack](https://open.spotify.com/artist/3aly4xJOy3LVznzvRIvFYC)
- **Apple Music**: Search "F1 Movie Soundtrack Daniel Pemberton"
- **YouTube Music**: F1 Original Motion Picture Soundtrack

**Note**: You'll need to convert streaming audio to MP3 format using legal methods (purchasing from iTunes, Amazon Music, etc.)

## Features

### Player Controls
- ▶️ **Play/Pause** - Center button with glow effect
- ⏮️ **Previous Track** - Skip to previous song
- ⏭️ **Next Track** - Skip to next song
- 🔀 **Shuffle** - Randomize playback order
- 🔁 **Repeat** - Loop current track
- 🔊 **Volume** - Adjustable volume slider (0-100%)

### Interactive Elements
- **Progress Bar**: Click/drag to seek within track
- **Track List**: Click any song to play immediately
- **Current Track Highlight**: Active track shown with blue accent
- **Keyboard Support**: Spacebar to play/pause

### Visual Feedback
- Playing indicator in track list (▶ symbol)
- Real-time waveform animation
- Pulse animation on "Now Playing" indicator
- Smooth transitions and hover effects

## Implementation Details

### Component Location
`/src/components/ui/music-player.tsx`

### Usage
```tsx
import { MusicPlayer } from '@/components/ui/music-player';

// In your component
<MusicPlayer hidden={false} />
```

### Props
- `hidden` (boolean): Controls visibility and animations

### Integration
The player is integrated into the `ComingSoon` page at `/src/pages/ComingSoon.tsx`

## Styling Architecture

The music player follows the AXEL Racing Team design system:

### CSS Custom Properties Used
```css
--primary: 210 100% 60%        /* Racing Blue */
--accent: 140 100% 50%         /* Racing Green */
--background: 0 0% 2%          /* Deep Black */
--racing-blue: 210 100% 60%
--racing-green: 140 100% 50%
```

### Tailwind Classes
- `backdrop-blur-xl` - Frosted glass effect
- `racing-glow` - Custom glow animation
- Gradient utilities for modern effects
- Border accents with transparency

### Animations
- **Framer Motion**: Slide-in animation from right
- **CSS Transitions**: Smooth state changes
- **Pulse Effects**: Visual breathing on active elements
- **Waveform**: Dynamic height animations

## Technical Features

### State Management
- Track index and history for shuffle
- Play/pause state
- Repeat and shuffle modes
- Volume control (default: 90%)
- Progress tracking with remaining time

### Audio Handling
- HTML5 Audio API
- Metadata loading for duration
- Error handling for missing files
- Preload optimization

### Responsive Design
- Optimized for desktop viewing
- Fixed position maintains visibility
- Scrollable track list for longer playlists

## File Structure
```
/public/songs/
  ├── Main Titles.mp3
  ├── Race Ready.mp3
  ├── Lights Out.mp3
  ├── Full Throttle.mp3
  ├── Apex Legends.mp3
  └── Podium Finish.mp3

/src/components/ui/
  └── music-player.tsx

/src/pages/
  └── ComingSoon.tsx (imports MusicPlayer)
```

## Testing Checklist
- [ ] Add MP3 files to `/public/songs/` folder
- [ ] Verify URL encoding in filenames (spaces as %20)
- [ ] Test play/pause functionality
- [ ] Test track navigation (prev/next)
- [ ] Test shuffle and repeat modes
- [ ] Test volume control
- [ ] Test progress bar seeking
- [ ] Test track list selection
- [ ] Verify animations and transitions
- [ ] Check keyboard controls (spacebar)

## Future Enhancements
- Add visualization based on actual audio frequency data
- Implement playlist editing
- Add equalizer controls
- Save volume preference to localStorage
- Add keyboard shortcuts for all controls
- Implement drag-and-drop playlist reordering

## Notes
- The player uses URL-encoded paths for files with spaces
- All song metadata is hardcoded in the component
- The waveform is currently a visual effect (not real audio analysis)
- Color scheme matches the AXEL racing brand identity
