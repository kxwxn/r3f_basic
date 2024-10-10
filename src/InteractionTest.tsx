import React from "react";
import { BoxGeometry } from "three";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

const InteractionTest = () => {
  const { camera, scene, raycaster, pointer } = useThree();

  const clickFunc = (e: any) => {
    console.log("clickFunc operated");
    e.stopPropagation();
    e.object.material.color = new THREE.Color("green");
  };

  const groupClick = (e: any) => {
    console.log("group operated");
    //     e.stopPropagation();
    //     e.object.material.color = new THREE.Color("green");
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObject(e.eventObject, true);
    console.log(intersects);
  };

  return (
    <>
      <ambientLight intensity={5} />
      <directionalLight intensity={10} />
      <group onClick={groupClick}>
        <mesh
          //     onClick={(e) => {
          //       clickFunc(e);
          //     }}
          position={[-2, 0, 0]}
        >
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
        <mesh
          //     onClick={(e) => {
          //       clickFunc(e);
          //     }}
          position={[0, 0, 0]}
        >
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
        <mesh
          //     onClick={(e) => {
          //       clickFunc(e);
          //     }}
          position={[2, 0, 0]}
        >
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </group>
    </>
  );
};

export default InteractionTest;

// three.js에서는 카메라와 가까운 곳에서 부터 이벤트가 발생해서 먼쪽까지 버블링이 일어난다.
