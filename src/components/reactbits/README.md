# ReactBits Component Library

This folder contains [reactbits.dev](https://reactbits.dev)-style components integrated into the portfolio.

## How to Add a New Component

1. **Copy the source** from [reactbits.dev](https://reactbits.dev). Each component ships as a standalone `.tsx` file.

2. **Create a folder** here: `components/reactbits/YourComponent/YourComponent.tsx`

3. **If it has CSS**, create `YourComponent.css` and import it at the top of the component:
   ```tsx
   import './YourComponent.css';
   ```
   Then add an `@import` to `src/app/globals.css`:
   ```css
   @import '../components/reactbits/YourComponent/YourComponent.css';
   ```

4. **Import and use** in any section:
   ```tsx
   import YourComponent from '@/components/reactbits/YourComponent/YourComponent';
   ```

## Installed Components

| Component | Folder | Used In |
|-----------|--------|---------|
| Aurora Background | `AuroraBackground/` | Page background |
| Text Scramble | `TextScramble/` | Section headings |
| Tilted Card | `TiltedCard/` | About section |
| Animated Counter | `AnimatedCounter/` | About stats |
| Spotlight Card | `SpotlightCard/` | Workflow cards |
| Decrypted Text | `DecryptedText/` | Hero title |
| Magnet Button | `MagnetButton/` | Contact CTA |
| Scroll Progress | `ScrollProgress/` | Alt progress bar |

## Dependencies

All ReactBits components use **only** dependencies already in `package.json`:
- `framer-motion`
- `lucide-react` (icons)
- `@react-three/fiber` / `@react-three/drei` / `three` (3D components only)

No new packages needed.
