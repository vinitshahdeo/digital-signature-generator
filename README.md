# Digital Signature Generator

> Create realistic, professional digital signatures and export them as transparent PNGs

A modern, production-ready React + TypeScript application for creating beautiful digital signatures with full customization options. Perfect for personalizing documents, emails, and digital artwork.

![Digital Signature Generator](https://img.shields.io/badge/React-18.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🖋️ Dual Signature Modes

- **Typed Signatures**: Type your name and customize with 20+ handwriting fonts
- **Freehand Drawing**: Draw signatures naturally with pressure-sensitive pen simulation

### 🎨 Advanced Customization

**Typed Mode:**
- 20+ premium handwriting fonts (Sacramento, Great Vibes, Dancing Script, Caveat, Allura, and more)
- Font size, weight, letter spacing, line height controls
- Slant/italic adjustment for cursive signatures (default: 0° - upright)
- Ink color with quick swatches (black, blue, royal blue, charcoal)
- Opacity and stroke texture for realistic ink effects
- Flourish options: underline, double underline, swoosh decorations
- Alignment (default: center) and rotation (default: 0°)
- **Monogram Mode**: Create elegant initials with circular, shield, or ribbon frames

**Freehand Mode:**
- Pressure-simulated pen with variable width
- Smoothing controls for clean lines
- Undo/Redo support
- Color, opacity, and pen size customization
- Optional ruled baseline guide (preview only)

### 📤 Professional Export

- **Transparent PNG** (default) - perfect for overlaying on documents
- **SVG** (vector format) - scalable without quality loss
- **PDF** - ready for printing
- Auto-trim transparent bounds with configurable padding
- Multiple resolutions: 1×, 2× (Retina), 3× (Ultra HD)
- Smart filename generation: `signature-{name}-{size}@{ratio}.png`

### 🎯 Presets & History

- **6 Curated Presets**: Executive, Casual, Elegant, Bold, Minimal, Doctor's Note
- Save custom presets to localStorage
- Recent history with thumbnail previews
- One-click restore of previous signatures

### 🌓 Modern UX

- Beautiful dark/light theme support
- Responsive design (mobile-friendly)
- Glass-morphism UI with smooth animations
- Keyboard shortcuts:
  - `Cmd/Ctrl + Z`: Undo
  - `Shift + Cmd/Ctrl + Z`: Redo
  - `E`: Export
  - `R`: Reset
- Accessible with proper ARIA labels and focus management

### ⚡ Technical Excellence

- **PWA Enabled**: Works offline after first visit
- **State Management**: Zustand for lightweight, performant state
- **Canvas Rendering**: react-konva for crisp, hardware-accelerated graphics
- **Type-Safe**: 100% TypeScript with strict mode
- **Testing Ready**: Vitest + React Testing Library setup
- **Optimized Fonts**: @fontsource packages for fast loading

## 🎨 Included Fonts

The app includes 20 beautiful handwriting fonts:

1. **Sacramento** - Elegant cursive
2. **Great Vibes** - Sophisticated script
3. **Dancing Script** - Lively and friendly
4. **Caveat** - Handwritten casual
5. **Allura** - Romantic calligraphy
6. **Satisfy** - Brushed script
7. **Pacifico** - Surf-inspired bold
8. **Homemade Apple** - Authentic handwriting
9. **Shadows Into Light** - Playful marker style
10. **Cookie** - Sweet cursive
11. **Alex Brush** - Classic brush script
12. **Amatic SC** - Hand-drawn bold
13. **Indie Flower** - Quirky handwriting
14. **Kaushan Script** - Energetic brush
15. **La Belle Aurore** - Vintage handwriting
16. **Marck Script** - Formal calligraphy
17. **Mrs Saint Delafield** - Copperplate script
18. **Pinyon Script** - Delicate flourishes
19. **Tangerine** - Feminine cursive
20. **Yellowtail** - Smooth brush script

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/vinitshahdeo/digital-signature-generator.git
cd digital-signature-generator

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Running Tests

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui
```

## 📖 Usage Guide

### Creating a Typed Signature

1. Select **Typed** mode in the header
2. Enter your **Full Name** or **Initials**
3. Choose a **Font Family** from 20+ handwriting fonts
4. Adjust **Font Size**, **Letter Spacing**, and **Slant**
5. Pick an **Ink Color** (or use quick swatches)
6. Add optional **Flourishes** (underline, swoosh)
7. Set **Alignment** and **Rotation** as needed
8. Click **Export** to download

### Drawing a Freehand Signature

1. Select **Freehand** mode in the header
2. Adjust **Pen Size** and **Color**
3. Draw your signature on the canvas
4. Use **Undo/Redo** to perfect your strokes
5. Enable **Show Baseline** for alignment guide
6. Click **Export** to download

### Creating a Monogram

1. Switch to **Typed** mode
2. Enter your **Initials** (e.g., "VS")
3. Enable **Monogram Mode** toggle
4. Choose a frame style (circle, shield, ribbon)
5. Customize colors and size
6. Export as transparent PNG

### Exporting Your Signature

1. Click **Export** button
2. Choose format: **PNG** (transparent), **SVG**, or **PDF**
3. Select resolution (1×, 2×, or 3×)
4. Enable **Auto-trim** to remove extra space
5. Adjust **Padding** if needed
6. Click **Export** to download

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── SignatureCanvas.tsx
│   ├── TypedSignatureLayer.tsx
│   ├── FreehandLayer.tsx
│   ├── ControlsPanel.tsx
│   ├── PresetsPanel.tsx
│   └── ExportDialog.tsx
├── stores/
│   └── signatureStore.ts    # Zustand state management
├── utils/
│   ├── fonts.ts             # Font loading & management
│   ├── export.ts            # PNG/SVG/PDF export utilities
│   └── effects.ts           # Flourishes & decorations
├── App.tsx
├── main.tsx
└── index.css
```

## 🔧 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Radix UI (shadcn/ui)
- **Icons**: Lucide React
- **Canvas**: react-konva + Konva.js
- **Animations**: Framer Motion
- **State**: Zustand
- **Fonts**: @fontsource packages
- **PWA**: vite-plugin-pwa
- **Testing**: Vitest + React Testing Library
- **Export**: jsPDF for PDF generation

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build
npm run build

# Deploy dist/ folder to Netlify
```

### GitHub Pages

```bash
# Update vite.config.ts base to '/digital-signature-generator/'
# Build and deploy dist/ to gh-pages branch
```

## 🧪 Testing

The project includes comprehensive tests:

- **Unit Tests**: Export utilities, font loading, preset serialization
- **Component Tests**: Controls, canvas, export dialog
- **Integration Tests**: Full signature creation and export flow

```bash
npm test                  # Run all tests
npm run test:ui           # Open Vitest UI
```

## ⚖️ Legal Notice

**Important**: Signatures created with this tool are for **personalization and creative purposes only**. They are **NOT legally binding** and should not be used as a substitute for handwritten signatures on legal documents, contracts, or official forms.

For legally binding electronic signatures, use certified e-signature services that comply with regulations like eIDAS, ESIGN, or UETA.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Font families from [Google Fonts](https://fonts.google.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Canvas rendering powered by [Konva](https://konvajs.org/)

## 📧 Contact

**Vinit Shahdeo**
- GitHub: [@vinitshahdeo](https://github.com/vinitshahdeo)
- Twitter: [@vinitshahdeo](https://twitter.com/vinit_shahdeo)

---

<p align="center">Made with ❤️ by <a href="https://github.com/vinitshahdeo">Vinit Shahdeo</a></p>
<p align="center">
  <a href="https://github.com/vinitshahdeo/digital-signature-generator/stargazers">⭐ Star this repo</a> if you find it useful!
</p>
