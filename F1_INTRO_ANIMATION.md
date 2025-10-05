# F1 Starting Lights Intro Animation

## 🏎️ Overview
An epic Formula 1-inspired starting lights sequence that plays when users first enter the website!

## ✨ Features

### 1. **Authentic F1 Starting Lights**
- **5 rows × 5 lights** = 25 red circular lights (just like real F1!)
- Lights turn on sequentially from top to bottom
- Each row lights up 0.6 seconds after the previous
- Pulsing glow effect on active lights

### 2. **"Lights Out and Away We Go!"**
- All lights go RED first (building tension)
- After a dramatic pause...
- **LIGHTS OUT!** - All lights turn GREEN simultaneously
- "LIGHTS OUT!" text flashes on screen

### 3. **Dynamic Speed Effects**
- Speed lines streak across the screen when lights go out
- Racing stripes (blue and green) shoot down the screen
- Zoom-out effect as if the camera is accelerating away
- Smooth fade to main content

### 4. **Professional Animation**
- Built with **GSAP** (GreenSock Animation Platform) for smooth timing
- **Framer Motion** for React-friendly animations
- Realistic light reflections and glows
- Pulsing intensity on red lights

## 🎬 Animation Timeline

```
0.0s  - Black screen with corner borders
0.5s  - First row of lights turns RED
1.1s  - Second row turns RED
1.7s  - Third row turns RED  
2.3s  - Fourth row turns RED
2.9s  - Fifth row turns RED (all lights now RED)
3.7s  - Brief hold...
3.8s  - LIGHTS OUT! All go GREEN
3.8s  - Speed lines and racing stripes animate
3.8s  - "LIGHTS OUT!" text flashes
4.1s  - Zoom out effect begins
4.6s  - Fade to main page
```

## 🎨 Visual Elements

### Lights
- **Outer ring**: White border with transparency
- **Inner circle**: Glowing red (then green)
- **Reflection**: White highlight on top
- **Glow**: Red aura around active lights (120px blur)
- **Green glow**: Even stronger when lights go out

### Background Effects
- **Speed lines**: 20 animated horizontal lines
- **Racing stripes**: Two gradient waves (accent green & primary blue)
- **Corner borders**: Technical F1-style frame
- **Black background**: Pure racing aesthetic

### Text
- **"Get Ready"**: Bottom text during red lights
- **"LIGHTS OUT!"**: Large, bold, green text flash

## 🔧 Technical Implementation

### Files Created
- `/src/components/F1StartingLights.tsx` - Main intro component

### Files Modified
- `/src/pages/ComingSoon.tsx` - Integrated intro sequence

### Dependencies Used
- **gsap**: Professional animation timeline control
- **framer-motion**: React animation framework
- **React hooks**: State management

### State Management
- `showIntro`: Controls if intro is visible
- `activeLights`: Tracks which light rows are on (0-5)
- `allOut`: Triggers the green light / lights out sequence

## 🎯 User Experience

1. **First Visit**: User sees intro animation
2. **Builds Tension**: Red lights turn on one by one
3. **Anticipation**: Brief pause with all lights red
4. **RELEASE**: Lights out + speed effects
5. **Smooth Entry**: Zoom to main page

## 🚀 Racing Authenticity

This animation replicates the real F1 starting procedure:
- ✅ Sequential red light activation
- ✅ All five rows of lights
- ✅ Random interval before lights out
- ✅ All lights extinguish simultaneously (GREEN FLAG!)
- ✅ Intense visual drama

## 💡 Future Enhancements

Possible additions:
- Engine sound effects
- Tire screech when lights go out
- Optional skip button for returning visitors
- Different intro variations
- Save state (don't show on every visit)

## 🎬 Demo Effect

**RED PHASE** (Tension building)
```
🔴🔴🔴🔴🔴
🔴🔴🔴🔴🔴
🔴🔴🔴🔴🔴
🔴🔴🔴🔴🔴
🔴🔴🔴🔴🔴
```

**LIGHTS OUT!** (GO GO GO!)
```
🟢🟢🟢🟢🟢  →  💨💨💨💨💨
```

---

**Welcome to AXEL - Racing into the Future! 🏎️💨**
