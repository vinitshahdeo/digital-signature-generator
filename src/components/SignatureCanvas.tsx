import React, { useRef, useEffect } from 'react';
import { Stage, Layer } from 'react-konva';
import { useSignatureStore } from '@/stores/signatureStore';
import TypedSignatureLayer from './TypedSignatureLayer';
import FreehandLayer from './FreehandLayer';
import Konva from 'konva';

interface SignatureCanvasProps {
  stageRef: React.RefObject<Konva.Stage>;
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({ stageRef }) => {
  const { mode, canvas } = useSignatureStore();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-full h-full p-8"
    >
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{
          width: canvas.width,
          height: canvas.height,
          backgroundColor: canvas.showGrid ? '#fafafa' : 'white',
        }}
      >
        <Stage
          ref={stageRef}
          width={canvas.width}
          height={canvas.height}
          className={canvas.showGrid ? 'signature-canvas' : ''}
        >
          <Layer>
            {mode === 'typed' ? (
              <TypedSignatureLayer />
            ) : (
              <FreehandLayer />
            )}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default SignatureCanvas;
