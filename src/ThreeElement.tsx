import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useControls } from "leva";
import { Box, Sphere } from "@react-three/drei";

const ThreeElement = () => {
  const { size, gl, scene, camera } = useThree();
  const groupRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const sphereCopyRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const box = useControls({
    rotation: { value: 0, min: -360, max: 360, step: 1 },
  });
  const sphereControl = useControls({
    radius: { value: 1, min: 0.1, max: 30, step: 0.1 },
    widthSegment: { value: 32, min: 3, max: 300, step: 1 },
    heightSegment: { value: 16, min: 2, max: 200, step: 1 },
    // phiStart: { value: 0, min: 0.1, max: 30, step: 0.1 },
    // phiLength: { value: Math.PI*2, min: 0.1, max: 30, step: 0.1 },
    // thetaStart: { value: 0, min: 0.1, max: 30, step: 0.1 },
    // thetaLength: { value: Math.PI, min: 0.1, max: 30, step: 0.1 },
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

  useEffect(() => {
    sphereCopyRef.current.geometry = sphereRef.current.geometry;
    // ref의 처음 값이 null 이기 때문에 작동하지 않아 useEffect를 사용한다.
  }, [
    sphereControl.radius,
    sphereControl.widthSegment,
    sphereControl.heightSegment,
  ]);

  scene.rotation.x = THREE.MathUtils.degToRad(45);

  return (
    <>
      <directionalLight position={[5, 5, 5]} />

      <Box position={[1, 1, 1]} args={[]}>
        <meshStandardMaterial color={"skyblue"} />
      </Box>
      <Sphere args={[]}></Sphere>
      {/* react-three/drei를 이용하여 mesh를 생성하는 방법. */}

      <mesh
        ref={sphereRef}
        geometry={
          new THREE.SphereGeometry(
            sphereControl.radius,
            sphereControl.widthSegment,
            sphereControl.heightSegment
          )
        }
      >
        <meshStandardMaterial wireframe />
      </mesh>

      <mesh ref={sphereCopyRef}>
        <meshStandardMaterial color={"red"} />
      </mesh>
      {/* 프로퍼티형식으로 mesh를 생성하는 방법 그리고 두개의 mesh가 하나의 geometry를 공유하는법 useRef를 사용하여 wireframe을 그린다. */}

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
