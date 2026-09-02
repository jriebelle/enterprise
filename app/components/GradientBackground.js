'use client';

import { MeshGradient } from '@paper-design/shaders-react';

export default function GradientBackground() {
  return (
    <MeshGradient
      speed={1}
      scale={1}
      distortion={0.73}
      swirl={0.07}
      grainMixer={0.44}
      grainOverlay={0.1}
      frame={315374.6999998243}
      colors={['#000000', '#FF6600', '#FF8C5A', '#FF5040']}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
}
