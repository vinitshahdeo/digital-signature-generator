import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { loadFonts } from './utils/fonts';

// Import all fonts
import '@fontsource/sacramento';
import '@fontsource/great-vibes';
import '@fontsource/dancing-script';
import '@fontsource/caveat';
import '@fontsource/allura';
import '@fontsource/satisfy';
import '@fontsource/pacifico';
import '@fontsource/homemade-apple';
import '@fontsource/shadows-into-light';
import '@fontsource/cookie';
import '@fontsource/alex-brush';
import '@fontsource/amatic-sc';
import '@fontsource/indie-flower';
import '@fontsource/kaushan-script';
import '@fontsource/la-belle-aurore';
import '@fontsource/marck-script';
import '@fontsource/mrs-saint-delafield';
import '@fontsource/pinyon-script';
import '@fontsource/tangerine';
import '@fontsource/yellowtail';

// Load fonts
loadFonts().catch(console.error);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
