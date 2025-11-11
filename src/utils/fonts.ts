import WebFont from 'webfontloader';

export interface HandwritingFont {
  name: string;
  family: string;
  displayName: string;
  category: 'elegant' | 'casual' | 'bold' | 'minimal';
  weight?: number;
  style?: string;
}

export const HANDWRITING_FONTS: HandwritingFont[] = [
  { name: 'sacramento', family: 'Sacramento', displayName: 'Sacramento', category: 'elegant' },
  { name: 'great-vibes', family: 'Great Vibes', displayName: 'Great Vibes', category: 'elegant' },
  { name: 'dancing-script', family: 'Dancing Script', displayName: 'Dancing Script', category: 'elegant' },
  { name: 'allura', family: 'Allura', displayName: 'Allura', category: 'elegant' },
  { name: 'satisfy', family: 'Satisfy', displayName: 'Satisfy', category: 'casual' },
  { name: 'pacifico', family: 'Pacifico', displayName: 'Pacifico', category: 'bold' },
  { name: 'homemade-apple', family: 'Homemade Apple', displayName: 'Homemade Apple', category: 'casual' },
  { name: 'shadows-into-light', family: 'Shadows Into Light', displayName: 'Shadows Into Light', category: 'casual' },
  { name: 'caveat', family: 'Caveat', displayName: 'Caveat', category: 'casual' },
  { name: 'cookie', family: 'Cookie', displayName: 'Cookie', category: 'elegant' },
  { name: 'alex-brush', family: 'Alex Brush', displayName: 'Alex Brush', category: 'elegant' },
  { name: 'amatic-sc', family: 'Amatic SC', displayName: 'Amatic SC', category: 'bold' },
  { name: 'indie-flower', family: 'Indie Flower', displayName: 'Indie Flower', category: 'casual' },
  { name: 'kaushan-script', family: 'Kaushan Script', displayName: 'Kaushan Script', category: 'bold' },
  { name: 'la-belle-aurore', family: 'La Belle Aurore', displayName: 'La Belle Aurore', category: 'casual' },
  { name: 'marck-script', family: 'Marck Script', displayName: 'Marck Script', category: 'elegant' },
  { name: 'mrs-saint-delafield', family: 'Mrs Saint Delafield', displayName: 'Mrs Saint Delafield', category: 'elegant' },
  { name: 'pinyon-script', family: 'Pinyon Script', displayName: 'Pinyon Script', category: 'elegant' },
  { name: 'tangerine', family: 'Tangerine', displayName: 'Tangerine', category: 'elegant' },
  { name: 'yellowtail', family: 'Yellowtail', displayName: 'Yellowtail', category: 'casual' },
];

let fontsLoaded = false;

export const loadFonts = (): Promise<void> => {
  if (fontsLoaded) return Promise.resolve();

  return new Promise((resolve, reject) => {
    WebFont.load({
      google: {
        families: HANDWRITING_FONTS.map(font => font.family)
      },
      active: () => {
        fontsLoaded = true;
        resolve();
      },
      inactive: () => {
        reject(new Error('Failed to load fonts'));
      },
      timeout: 10000
    });
  });
};

export const getFontByFamily = (family: string): HandwritingFont | undefined => {
  return HANDWRITING_FONTS.find(font => font.family === family);
};

export const getFontsByCategory = (category: HandwritingFont['category']): HandwritingFont[] => {
  return HANDWRITING_FONTS.filter(font => font.category === category);
};
