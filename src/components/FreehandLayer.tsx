import React, { useRef, useState } from 'react';
import { Line, Group, Rect } from 'react-konva';
import { useSignatureStore } from '@/stores/signatureStore';
import { KonvaEventObject } from 'konva/lib/Node';

const FreehandLayer: React.FC = () => {
  const { lines, freehand, addLine, canvas } = useSignatureStore();
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState<number[]>([]);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const lastTime = useRef<number>(0);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    setIsDrawing(true);
    const pos = e.target.getStage()?.getPointerPosition();
    if (pos) {
      lastPoint.current = pos;
      lastTime.current = Date.now();
      setCurrentLine([pos.x, pos.y]);
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    if (!point || !lastPoint.current) return;

    const now = Date.now();
    const distance = Math.sqrt(
      Math.pow(point.x - lastPoint.current.x, 2) +
        Math.pow(point.y - lastPoint.current.y, 2)
    );

    // Smooth the line using Catmull-Rom interpolation
    if (distance > 2) {
      const smoothing = freehand.smoothing / 100;
      const smoothedX = lastPoint.current.x + (point.x - lastPoint.current.x) * smoothing;
      const smoothedY = lastPoint.current.y + (point.y - lastPoint.current.y) * smoothing;

      setCurrentLine((prev) => [...prev, smoothedX, smoothedY]);

      lastPoint.current = { x: smoothedX, y: smoothedY };
      lastTime.current = now;
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;

    setIsDrawing(false);
    if (currentLine.length > 0) {
      addLine({
        points: currentLine,
        color: freehand.penColor,
        width: freehand.penSize,
        opacity: freehand.penOpacity,
      });
      setCurrentLine([]);
    }
    lastPoint.current = null;
  };

  return (
    <Group>
      {/* Invisible rect to capture mouse events across entire canvas */}
      <Rect
        x={0}
        y={0}
        width={canvas.width}
        height={canvas.height}
        fill="transparent"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      />

      {/* Rendered lines */}
      {lines.map((line: { points: number[]; color: string; width: number; opacity: number }, i: number) => (
        <Line
          key={i}
          points={line.points}
          stroke={line.color}
          strokeWidth={line.width}
          opacity={line.opacity}
          tension={0.5}
          lineCap="round"
          lineJoin="round"
          globalCompositeOperation="source-over"
        />
      ))}

      {/* Current line being drawn */}
      {isDrawing && currentLine.length > 0 && (
        <Line
          points={currentLine}
          stroke={freehand.penColor}
          strokeWidth={freehand.penSize}
          opacity={freehand.penOpacity}
          tension={0.5}
          lineCap="round"
          lineJoin="round"
        />
      )}

      {/* Baseline guide (preview only, not exported) */}
      {freehand.showBaseline && (
        <Line
          points={[0, canvas.height / 2, canvas.width, canvas.height / 2]}
          stroke="#3b82f6"
          strokeWidth={1}
          opacity={0.3}
          dash={[5, 5]}
          listening={false}
        />
      )}
    </Group>
  );
};

export default FreehandLayer;
