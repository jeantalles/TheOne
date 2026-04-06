import { MeshGradient } from '@paper-design/shaders-react';

export default function HeroMeshGradient() {
  return (
    <MeshGradient
      speed={0.65}
      scale={0.8}
      distortion={0.16}
      swirl={0}
      colors={['#FFB19E', '#F3EBE4', '#F5EDE8', '#F3ECE5']}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
