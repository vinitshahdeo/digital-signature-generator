import { describe, it, expect } from 'vitest';
import { HANDWRITING_FONTS, getFontByFamily, getFontsByCategory } from '../utils/fonts';

describe('Font Utilities', () => {
  it('should have at least 20 fonts', () => {
    expect(HANDWRITING_FONTS.length).toBeGreaterThanOrEqual(20);
  });

  it('should find font by family name', () => {
    const font = getFontByFamily('Sacramento');
    expect(font).toBeDefined();
    expect(font?.family).toBe('Sacramento');
  });

  it('should return undefined for non-existent font', () => {
    const font = getFontByFamily('NonExistentFont');
    expect(font).toBeUndefined();
  });

  it('should filter fonts by category', () => {
    const elegantFonts = getFontsByCategory('elegant');
    expect(elegantFonts.length).toBeGreaterThan(0);
    elegantFonts.forEach(font => {
      expect(font.category).toBe('elegant');
    });
  });

  it('should have all required font properties', () => {
    HANDWRITING_FONTS.forEach(font => {
      expect(font).toHaveProperty('name');
      expect(font).toHaveProperty('family');
      expect(font).toHaveProperty('displayName');
      expect(font).toHaveProperty('category');
    });
  });
});
