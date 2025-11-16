<p align="center">
<img src="./public/logo.png" height="150px" width="150px">
</p>

<h1 align="center">Digital Signature Generator</h1>

<p align="center"><strong>Create clean, realistic digital signatures and export them as transparent PNGs.</strong></p>
<p align="center"><a href="https://digitalsignaturegenerator.netlify.app">See Live</a></p>
<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-blue" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.3-blue" alt="TypeScript">
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38bdf8" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
</p>

```javascript
// That's it — keep it simple
const workflow = {
  sign: "✍️",
  tweak: "🎨",
  export: "📥",
};

Object.values(workflow).join(" → "); // ✍️ → 🎨 → 📥
```

A modern, production-ready React + TypeScript application for creating beautiful digital signatures with full customization options. Perfect for personalizing documents, emails, and digital artwork.

## ✨ What it does

- Type or draw your signature
- Tweak basic styling (font, size, color)
- Export as transparent image for documents and emails

**That's it — keep it simple, sign, tweak, export. ✍️**
> [See Live.](https://digitalsignaturegenerator.netlify.app/)

## 🎯 Features

Supports Dual Signature Modes:

- **Typed Signatures**: Type your name and customize with 20+ handwriting fonts
- **Freehand Drawing**: Draw signatures naturally with pressure-sensitive pen simulation


> [!NOTE]
> If you don't see all 6 presets (Executive, Casual, Elegant, Bold, Minimal, Doctor's Note), run this in your browser console:
```javascript
localStorage.removeItem('signature-storage');
location.reload();
```

## 🚀 Getting Started

### 📋 Prerequisites

Node.js 18+ and `npm` / `yarn` / `pnpm`

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/vinitshahdeo/digital-signature-generator.git
cd digital-signature-generator

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
# That's it — keep it simple, sign, tweak, export. ✍️
```

### 🏗️ Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 🎨 Included Fonts

The app includes 20 beautiful handwriting fonts:

| #   | Font Name               | Style Description     |
| --- | ----------------------- | --------------------- |
| 1   | **Sacramento**          | Elegant cursive       |
| 2   | **Great Vibes**         | Sophisticated script  |
| 3   | **Dancing Script**      | Lively and friendly   |
| 4   | **Caveat**              | Handwritten casual    |
| 5   | **Allura**              | Romantic calligraphy  |
| 6   | **Satisfy**             | Brushed script        |
| 7   | **Pacifico**            | Surf-inspired bold    |
| 8   | **Homemade Apple**      | Authentic handwriting |
| 9   | **Shadows Into Light**  | Playful marker style  |
| 10  | **Cookie**              | Sweet cursive         |
| 11  | **Alex Brush**          | Classic brush script  |
| 12  | **Amatic SC**           | Hand-drawn bold       |
| 13  | **Indie Flower**        | Quirky handwriting    |
| 14  | **Kaushan Script**      | Energetic brush       |
| 15  | **La Belle Aurore**     | Vintage handwriting   |
| 16  | **Marck Script**        | Formal calligraphy    |
| 17  | **Mrs Saint Delafield** | Copperplate script    |
| 18  | **Pinyon Script**       | Delicate flourishes   |
| 19  | **Tangerine**           | Feminine cursive      |
| 20  | **Yellowtail**          | Smooth brush script   |

## ⚖️ Legal Notice

> [!IMPORTANT]
> Signatures created with this tool are for **personalization and creative purposes only**. They are **NOT legally binding** and should not be used as a substitute for handwritten signatures on legal documents, contracts, or official forms.
> For legally binding electronic signatures, use certified e-signature services that comply with regulations like eIDAS, ESIGN, or UETA.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🙏 Acknowledgments

<table>
  <tr>
    <td align="center" width="25%">
      <img src="https://www.gstatic.com/images/branding/product/1x/google_fonts_blue_ios_96dp.png" width="48" height="48" alt="Google Fonts"/>
      <br />
      <strong>Google Fonts</strong>
      <br />
      <sub>Font families</sub>
      <br />
      <a href="https://fonts.google.com/">fonts.google.com</a>
    </td>
    <td align="center" width="25%">
      <img src="https://ui.shadcn.com/apple-touch-icon.png" width="48" height="48" alt="shadcn/ui"/>
      <br />
      <strong>shadcn/ui</strong>
      <br />
      <sub>UI components</sub>
      <br />
      <a href="https://ui.shadcn.com/">ui.shadcn.com</a>
    </td>
    <td align="center" width="25%">
      <img src="https://lucide.dev/logo.dark.svg" width="48" height="48" alt="Lucide"/>
      <br />
      <strong>Lucide</strong>
      <br />
      <sub>Icon library</sub>
      <br />
      <a href="https://lucide.dev/">lucide.dev</a>
    </td>
    <td align="center" width="25%">
      <img src="https://konvajs.org/img/icon.png" width="48" height="48" alt="Konva"/>
      <br />
      <strong>Konva.js</strong>
      <br />
      <sub>Canvas rendering</sub>
      <br />
      <a href="https://konvajs.org/">konvajs.org</a>
    </td>
  </tr>
</table>

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

[![Sponsor Vinit Shahdeo](https://img.shields.io/badge/sponsor-vinitshahdeo-30363D?style=flat&logo=GitHub-Sponsors&logoColor=#EA4AAA)](https://github.com/sponsors/vinitshahdeo)


<br/><br/>

<p align="center">
<img src="./public/logo.png" height="90px" width="90px">
</p>

<p align="center">
  <a href="https://github.com/vinitshahdeo/digital-signature-generator/stargazers">⭐ Star this repo</a> if you find it useful!
</p>
<p align="center">
  <a href="https://github.com/vinitshahdeo?tab=followers">
    <img src="https://img.shields.io/github/followers/vinitshahdeo?label=Follow%20@vinitshahdeo&style=social" alt="GitHub followers">
  </a>
  <br/>
</p>

