import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

const CustomDodecahedronGeometry = new THREE.DodecahedronGeometry(1, 0);

const Crystal = ({ position, scale, onPointerOver, onPointerOut, onClick, emissiveIntensity = 1 }) => {
   const meshRef = useRef(null);
   const { raycaster, camera, scene } = useThree();

   const material = useMemo(() => {
      return new THREE.ShaderMaterial({
         vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
         fragmentShader: `
        uniform float emissiveIntensity;
        varying vec2 vUv;

        float interferencePattern(float value) {
          return mix(0.8, 1.0, sin(value * 1.0) * 0.5 + 0.5);
        }

        void main() {
          float interferenceValue = interferencePattern(vUv.y * gl_FragCoord.y);
          vec3 color = vec3(vUv.x, vUv.y, 1.0) * interferenceValue;
          color *= emissiveIntensity;
          gl_FragColor = vec4(color, 0.3);
        }`,
         uniforms: {
            emissiveIntensity: { value: emissiveIntensity },
         },
         transparent: true,
         blending: THREE.AdditiveBlending,
         side: THREE.DoubleSide,
      });
   }, [emissiveIntensity]);

   useEffect(() => {
      if (material.uniforms.emissiveIntensity) {
         material.uniforms.emissiveIntensity.value = emissiveIntensity;
      }
   }, [emissiveIntensity, material]);

   useFrame(({ clock }) => {
      if (meshRef.current) {
         meshRef.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.3;
         meshRef.current.rotation.y = Math.cos(clock.getElapsedTime()) * 0.2;
      }
   });

   // Handle the click using event delegation and raycasting
   useEffect(() => {
      const handleClick = event => {
         raycaster.setFromCamera(new THREE.Vector2((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1), camera);
         const intersects = raycaster.intersectObjects(scene.children, true);

         if (intersects.length > 0 && intersects[0].object === meshRef.current) {
            onClick && onClick();
         }
      };

      window.addEventListener('click', handleClick);

      return () => {
         window.removeEventListener('click', handleClick);
      };
   }, [onClick, raycaster, camera, scene]);

   return (
      <mesh ref={meshRef} position={position} rotation={[Math.PI / 90, 0, 0]} material={material} scale={scale} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
         <primitive object={CustomDodecahedronGeometry} attach="geometry" />
      </mesh>
   );
};

export default Crystal;
