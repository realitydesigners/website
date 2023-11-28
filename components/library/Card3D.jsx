import { Text } from '@react-three/drei';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

const Card3D = props => {
   const { title, position, author } = props;

   const meshRef = useRef(null);

   const material = useMemo(() => {
      return new THREE.ShaderMaterial({
         vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
         fragmentShader: `
        varying vec2 vUv;
  
        void main() {
          float brightness = mix(0.5, 1.0, length(vUv - 0.5));
          gl_FragColor = vec4(vec3(brightness), 0.2); // Slightly transparent white
        }`,
         transparent: true,
         side: THREE.DoubleSide,
      });
   }, []);

   return (
      <mesh ref={meshRef} position={position}>
         <primitive attach="material" object={material} />
         <Text position={[0, 0.2, 0.07]} fontSize={0.1} color="black" maxWidth={0.8} font="/fonts/monomaniac.ttf">
            {title}
         </Text>
      </mesh>
   );
};
export default Card3D;
