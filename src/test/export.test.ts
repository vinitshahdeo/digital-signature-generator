import { describe, it, expect } from 'vitest';
import { getTransparentBounds, generateFileName } from '../utils/export';

describe('Export Utilities', () => {
  describe('generateFileName', () => {
    it('should generate filename with name', () => {
      const result = generateFileName('Vinit Shahdeo', 'VS', { width: 600, height: 200 }, 2, 'png');
      expect(result).toBe('signature-john-doe-600x200@2x.png');
    });

    it('should generate filename with initials when no name', () => {
      const result = generateFileName('', 'VS', { width: 300, height: 100 }, 1, 'png');
      expect(result).toBe('signature-jd-300x100.png');
    });

    it('should handle different formats', () => {
      const result = generateFileName('Test', '', { width: 600, height: 200 }, 1, 'svg');
      expect(result).toBe('signature-test-600x200.svg');
    });

    it('should sanitize special characters', () => {
      const result = generateFileName('John O\'Brien', '', { width: 600, height: 200 }, 1, 'png');
      expect(result).toBe('signature-john-o-brien-600x200.png');
    });
  });

  describe('getTransparentBounds', () => {
    it('should return null for empty canvas', () => {
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const result = getTransparentBounds(canvas);
      expect(result).toBeNull();
    });

    it('should detect non-transparent pixels', () => {
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(10, 10, 50, 50);
        
        const result = getTransparentBounds(canvas);
        expect(result).not.toBeNull();
        expect(result?.x).toBe(10);
        expect(result?.y).toBe(10);
        expect(result?.width).toBe(50);
        expect(result?.height).toBe(50);
      }
    });
  });
});
