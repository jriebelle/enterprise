'use client';

import { LiquidMetal } from '@paper-design/shaders-react';

export default function DiamondIcon() {
  return (
    <div style={{
      borderRadius: '40px',
      boxShadow: 'rgba(0, 0, 0, 0.4) 0px 29px 37px',
      flexShrink: 0,
    }}>
      <LiquidMetal
        speed={1}
        softness={0}
        repetition={1.8}
        shiftRed={0.48}
        shiftBlue={0.3}
        distortion={0.47}
        contour={0.65}
        scale={1}
        rotation={0}
        shape="diamond"
        angle={0}
        image="https://app.paper.design/file-assets/01KJ8D8GP2A3KFZNVYAZMD7XC9/01KJ8ETRBZBWA7EVR8W8V55W51.png"
        frame={1344214.599998843}
        colorBack="#00000000"
        colorTint="#FFFFFF"
        style={{
          height: '150px',
          width: '150px',
          borderRadius: '40px',
          backgroundColor: '#00000000',
          mixBlendMode: 'screen',
          display: 'block',
        }}
      />
    </div>
  );
}
