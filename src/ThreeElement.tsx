import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import React from "react";
import { useRef } from "react";
import { useControls } from "leva";

const ThreeElement = () => {
  const { size, gl, scene, camera } = useThree();
  const boxRef = useRef<THREE.Mesh>(null);
  const box = useControls({
    rotation: { value: 0, min: -360, max: 360, step: 1 },
  });

  // const geo = new THREE.BoxGeometry(1, 1, 1);
  // const mat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // const cube = new THREE.Mesh(geo, mat);
  // scene.add(cube);
  // Three.js 로 mesh를 추가하는 방법

  useFrame((state, delta) => {
    console.log("boxRef:", boxRef);
    console.log("state:", state);
    console.log("delta:", delta);
    boxRef.current.rotation.x += delta;
    boxRef.current.rotation.y += delta;
    // boxRef.current.scale.z += 0.01;
  }); // useFrame은 애니메이션으로 뭔가를 만들기 위해서 필요하다.

  return (
    <>
      <directionalLight position={[5, 5, 5]} />
      <mesh
        ref={boxRef}
        rotation={[
          THREE.MathUtils.degToRad(45),
          THREE.MathUtils.degToRad(box.rotation),
          0,
        ]}
        position={[2, 2, 2]}
        scale={[3, 3, 3]}
      >
        <icosahedronGeometry />
        <meshStandardMaterial color={"red"} />
      </mesh>
    </>
  );
};

export default ThreeElement;
