import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import React from "react";
import { useRef } from "react";
import { useControls } from "leva";
import { Box } from "@react-three/drei";

const ThreeElement = () => {
  const { size, gl, scene, camera } = useThree();
  const groupRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const box = useControls({
    rotation: { value: 0, min: -360, max: 360, step: 1 },
  });

  // const geo = new THREE.BoxGeometry(1, 1, 1);
  // const mat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // const cube = new THREE.Mesh(geo, mat);
  // scene.add(cube);
  // Three.js 로 mesh를 추가하는 방법

  useFrame((state, delta) => {
    groupRef.current.rotation.x += 0.03;
    scene.rotation.x += 0.01;
    console.log("boxRef:", boxRef);
    console.log("state:", state);
    console.log("delta:", delta);
    boxRef.current.rotation.x += delta;
    boxRef.current.rotation.y += delta;
    // boxRef.current.scale.z += 0.01;
  }); // useFrame은 애니메이션으로 뭔가를 만들기 위해서 필요하다.

  scene.rotation.x = THREE.MathUtils.degToRad(45);

  return (
    <>
      <directionalLight position={[5, 5, 5]} />

      <Box position={[1, 1, 1]}>
        <meshStandardMaterial color={"skyblue"} />
      </Box>
      {/* react-three/drei를 이용하여 mesh를 생성하는 방법. */}

      <mesh
        geometry={new THREE.BoxGeometry(2, 2, 2)}
        position={[-2, -2, -2]}
      ></mesh>
      {/* 프로퍼티형식으로 mesh를 생성하는 방법 */}

      <group position={[5, 5, 5]} ref={groupRef}>
        <mesh position={[-3, -3, -3]}>
          <boxGeometry />
          <meshStandardMaterial color={"hotpink"} />
        </mesh>
        <mesh visible ref={ringRef} position={[7, 7, 5]}>
          <ringGeometry args={[1, 5, 32]} />
          <meshStandardMaterial color={"green"} side={THREE.DoubleSide} />
        </mesh>
        <mesh
          ref={boxRef}
          rotation={[
            THREE.MathUtils.degToRad(45),
            THREE.MathUtils.degToRad(box.rotation),
            0,
          ]}
          position={[2, 2, 2]}
          scale={[5, 3, 3]}
        >
          <icosahedronGeometry />
          <meshStandardMaterial color={"red"} />
        </mesh>
        {/* child형식으로 메쉬를 생성하는 방법 */}
      </group>
    </>
  );
};

export default ThreeElement;
