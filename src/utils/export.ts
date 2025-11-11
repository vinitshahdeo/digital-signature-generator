import Konva from 'konva';
import { jsPDF } from 'jspdf';

export interface ExportOptions {
  format: 'png' | 'svg' | 'pdf';
  pixelRatio: 1 | 2 | 3;
  trim: boolean;
  padding: number;
  width: number;
  height: number;
  fileName: string;
  includeWatermark?: boolean;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Trim transparent pixels from canvas and return bounding box
 */
export const getTransparentBounds = (
  canvas: HTMLCanvasElement
): BoundingBox | null => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const { width, height } = canvas;
  const imageData = ctx.getImageData(0, 0, width, height);
  const { data } = imageData;

  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  // Scan for non-transparent pixels
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha > 0) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  // No content found
  if (minX > maxX || minY > maxY) {
    return null;
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  };
};

/**
 * Create a trimmed canvas with padding
 */
export const createTrimmedCanvas = (
  sourceCanvas: HTMLCanvasElement,
  bounds: BoundingBox,
  padding: number
): HTMLCanvasElement => {
  const trimmedCanvas = document.createElement('canvas');
  trimmedCanvas.width = bounds.width + padding * 2;
  trimmedCanvas.height = bounds.height + padding * 2;

  const ctx = trimmedCanvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');

  ctx.drawImage(
    sourceCanvas,
    bounds.x,
    bounds.y,
    bounds.width,
    bounds.height,
    padding,
    padding,
    bounds.width,
    bounds.height
  );

  return trimmedCanvas;
};

/**
 * Export stage to PNG with transparent background
 */
export const exportToPNG = async (
  stage: Konva.Stage,
  options: ExportOptions
): Promise<void> => {
  const { pixelRatio, trim, padding, fileName } = options;

  // Create temporary canvas at higher resolution
  const canvas = stage.toCanvas({ pixelRatio });

  let finalCanvas = canvas;

  if (trim) {
    const bounds = getTransparentBounds(canvas);
    if (bounds) {
      finalCanvas = createTrimmedCanvas(canvas, bounds, padding * pixelRatio);
    }
  }

  // Convert to blob and download
  finalCanvas.toBlob((blob) => {
    if (!blob) {
      console.error('Failed to create blob');
      return;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 'image/png');
};

/**
 * Export stage to SVG
 */
export const exportToSVG = async (
  stage: Konva.Stage,
  options: ExportOptions
): Promise<void> => {
  const { fileName } = options;

  const svg = stage.toDataURL({ mimeType: 'image/svg+xml' });
  const blob = await fetch(svg).then(r => r.blob());

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = fileName.replace('.png', '.svg');
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export stage to PDF
 */
export const exportToPDF = async (
  stage: Konva.Stage,
  options: ExportOptions
): Promise<void> => {
  const { fileName, pixelRatio } = options;

  const dataURL = stage.toDataURL({ pixelRatio });
  const canvas = stage.toCanvas({ pixelRatio });

  // Create PDF with canvas dimensions (in mm)
  const pdf = new jsPDF({
    orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height],
  });

  pdf.addImage(dataURL, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save(fileName.replace('.png', '.pdf'));
};

/**
 * Main export function
 */
export const exportSignature = async (
  stage: Konva.Stage,
  options: ExportOptions
): Promise<void> => {
  switch (options.format) {
    case 'png':
      await exportToPNG(stage, options);
      break;
    case 'svg':
      await exportToSVG(stage, options);
      break;
    case 'pdf':
      await exportToPDF(stage, options);
      break;
    default:
      throw new Error(`Unsupported format: ${options.format}`);
  }
};

/**
 * Generate filename based on signature content
 */
export const generateFileName = (
  name: string,
  initials: string,
  size: { width: number; height: number },
  pixelRatio: number,
  format: 'png' | 'svg' | 'pdf'
): string => {
  const base = name || initials || 'signature';
  const sanitized = base.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const dimension = `${size.width}x${size.height}`;
  const ratio = pixelRatio > 1 ? `@${pixelRatio}x` : '';
  return `signature-${sanitized}-${dimension}${ratio}.${format}`;
};
