import React, { useEffect, useRef } from 'react';
import { Text, Group } from 'react-konva';
import { useSignatureStore } from '@/stores/signatureStore';
import Konva from 'konva';

const TypedSignatureLayer: React.FC = () => {
  const { typed, canvas } = useSignatureStore();
  const textRef = useRef<Konva.Text>(null);
  const groupRef = useRef<Konva.Group>(null);

  const displayText = typed.monogramMode ? typed.initials : typed.fullName;

  useEffect(() => {
    if (!textRef.current || !groupRef.current) return;

    const textNode = textRef.current;
    const group = groupRef.current;

    // Apply alignment
    const textWidth = textNode.width();
    const canvasWidth = canvas.width;

    let x = 20;
    if (typed.alignment === 'center') {
      x = (canvasWidth - textWidth) / 2;
    } else if (typed.alignment === 'right') {
      x = canvasWidth - textWidth - 20;
    }

    textNode.x(x);

    // Apply rotation
    group.rotation(typed.rotation);

    // Apply slant (skew effect)
    textNode.skewX(typed.slant);
  }, [typed, canvas.width]);

  // Calculate position - vertically centered
  const baseY = canvas.height / 2 - (typed.fontSize * typed.lineHeight) / 2 + typed.baselineOffset;

  // Determine font style based on weight
  const getFontStyle = () => {
    if (typed.fontWeight >= 700) return 'bold';
    if (typed.fontWeight <= 300) return 'lighter';
    return 'normal';
  };

  return (
    <Group ref={groupRef} x={0} y={0}>
      <Text
        ref={textRef}
        text={displayText}
        fontSize={typed.fontSize}
        fontFamily={typed.fontFamily}
        fontStyle={getFontStyle()}
        fill={typed.color}
        opacity={typed.opacity}
        letterSpacing={typed.letterSpacing}
        lineHeight={typed.lineHeight}
        y={baseY}
        align={typed.alignment}
        shadowColor={typed.strokeTexture > 0 ? 'rgba(0,0,0,0.2)' : 'transparent'}
        shadowBlur={typed.strokeTexture / 10}
        shadowOpacity={typed.strokeTexture / 100}
      />
      {displayText && typed.title && (
        <Text
          text={typed.title}
          fontSize={typed.fontSize * 0.4}
          fontFamily={typed.fontFamily}
          fontStyle={getFontStyle()}
          fill={typed.color}
          opacity={typed.opacity * 0.8}
          x={20}
          y={baseY + typed.fontSize * typed.lineHeight + 10}
        />
      )}
    </Group>
  );
};

export default TypedSignatureLayer;
