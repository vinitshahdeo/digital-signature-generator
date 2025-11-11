import Konva from 'konva';

export type FlourishType = 'none' | 'underline' | 'double-underline' | 'swoosh-left' | 'swoosh-right' | 'circle';

export interface FlourishConfig {
  type: FlourishType;
  size: number;
  offset: number;
  color: string;
  opacity: number;
}

/**
 * Create an underline flourish
 */
export const createUnderline = (
  width: number,
  config: FlourishConfig
): Konva.Line => {
  const y = config.offset;
  return new Konva.Line({
    points: [0, y, width, y],
    stroke: config.color,
    strokeWidth: config.size,
    opacity: config.opacity,
    lineCap: 'round',
    lineJoin: 'round',
  });
};

/**
 * Create a double underline flourish
 */
export const createDoubleUnderline = (
  width: number,
  config: FlourishConfig
): Konva.Group => {
  const group = new Konva.Group();
  const y1 = config.offset;
  const y2 = config.offset + config.size * 2;

  const line1 = new Konva.Line({
    points: [0, y1, width, y1],
    stroke: config.color,
    strokeWidth: config.size,
    opacity: config.opacity,
    lineCap: 'round',
  });

  const line2 = new Konva.Line({
    points: [0, y2, width, y2],
    stroke: config.color,
    strokeWidth: config.size,
    opacity: config.opacity,
    lineCap: 'round',
  });

  group.add(line1, line2);
  return group;
};

/**
 * Create a swoosh flourish (decorative curve)
 */
export const createSwoosh = (
  width: number,
  config: FlourishConfig,
  direction: 'left' | 'right'
): Konva.Line => {
  const height = config.size * 3;
  const y = config.offset;
  
  let points: number[];
  if (direction === 'right') {
    points = [
      0, y,
      width * 0.3, y,
      width * 0.7, y - height,
      width, y - height,
    ];
  } else {
    points = [
      0, y - height,
      width * 0.3, y - height,
      width * 0.7, y,
      width, y,
    ];
  }

  return new Konva.Line({
    points,
    stroke: config.color,
    strokeWidth: config.size,
    opacity: config.opacity,
    lineCap: 'round',
    lineJoin: 'round',
    tension: 0.5,
  });
};

/**
 * Create a circle flourish (for monograms)
 */
export const createCircle = (
  radius: number,
  config: FlourishConfig
): Konva.Circle => {
  return new Konva.Circle({
    radius,
    stroke: config.color,
    strokeWidth: config.size,
    opacity: config.opacity,
  });
};

/**
 * Create a shield/crest frame for monograms
 */
export const createShield = (
  width: number,
  height: number,
  config: FlourishConfig
): Konva.Path => {
  const pathData = `
    M ${width / 2} 0
    L ${width} ${height * 0.2}
    L ${width} ${height * 0.7}
    Q ${width} ${height} ${width / 2} ${height}
    Q 0 ${height} 0 ${height * 0.7}
    L 0 ${height * 0.2}
    Z
  `;

  return new Konva.Path({
    data: pathData,
    stroke: config.color,
    strokeWidth: config.size,
    opacity: config.opacity,
    fill: 'transparent',
  });
};

/**
 * Create a ribbon frame for monograms
 */
export const createRibbon = (
  width: number,
  height: number,
  config: FlourishConfig
): Konva.Group => {
  const group = new Konva.Group();
  
  const ribbon = new Konva.Rect({
    width,
    height: height * 0.4,
    y: height * 0.3,
    stroke: config.color,
    strokeWidth: config.size,
    opacity: config.opacity,
    cornerRadius: 5,
  });

  const leftTail = new Konva.Line({
    points: [0, height * 0.5, -width * 0.2, height * 0.7, 0, height * 0.7],
    stroke: config.color,
    strokeWidth: config.size,
    opacity: config.opacity,
    closed: true,
  });

  const rightTail = new Konva.Line({
    points: [width, height * 0.5, width * 1.2, height * 0.7, width, height * 0.7],
    stroke: config.color,
    strokeWidth: config.size,
    opacity: config.opacity,
    closed: true,
  });

  group.add(ribbon, leftTail, rightTail);
  return group;
};

/**
 * Apply texture/noise to simulate ink bleed
 */
export const applyInkTexture = (
  shape: Konva.Text | Konva.Line,
  intensity: number
): void => {
  if (intensity === 0) return;

  // Add subtle shadow for depth
  shape.shadowColor('rgba(0,0,0,0.2)');
  shape.shadowBlur(intensity * 2);
  shape.shadowOffset({ x: 0, y: 1 });
  shape.shadowOpacity(intensity / 100);
};

/**
 * Create flourish based on type
 */
export const createFlourish = (
  type: FlourishType,
  width: number,
  height: number,
  config: FlourishConfig
): Konva.Shape | Konva.Group | null => {
  switch (type) {
    case 'underline':
      return createUnderline(width, config);
    case 'double-underline':
      return createDoubleUnderline(width, config);
    case 'swoosh-left':
      return createSwoosh(width, config, 'left');
    case 'swoosh-right':
      return createSwoosh(width, config, 'right');
    case 'circle':
      return createCircle(Math.max(width, height) / 2 + 10, config);
    case 'none':
    default:
      return null;
  }
};
