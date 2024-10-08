import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeElementScn = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const controls = useControls({
    thickness: { value: 0.1, min: 0.1, max: 10, steps: 0.1 },
  });

  //   const meshCopyRefFirst = useRef<THREE.Mesh>(null);
  //   const meshCopyRefSecond = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {});
  useEffect(() => {
    for (let i = 0; i < groupRef.current!.children.length; i++) {
      const mesh = groupRef.current!.children[i] as THREE.Mesh;
      mesh.geometry = meshRef.current!.geometry;
      mesh.position.x = i * 2;
    }

    //     meshCopyRefFirst.current!.geometry = meshRef.current!.geometry;
    //     meshCopyRefSecond.current!.geometry = meshRef.current!.geometry;
  }, []);

  return (
    <>
      <directionalLight position={[5, 5, 5]} intensity={2} />
      {/* <fog attach={"fog"} args={["grey", 10, 4]} /> */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[0.5, 0.18]} />
        <meshBasicMaterial wireframe color={"red"} visible={false} />
      </mesh>

      <group ref={groupRef}>
        {/* meshBasicMaterial (wireframe) */}
        <mesh>
          <meshBasicMaterial wireframe color={"green"} />
        </mesh>

        {/* meshBasicMaterial */}
        <mesh>
          <meshBasicMaterial //빛의 영향을 받지 않는 재질이다
            color={"red"}
            visible={true}
            transparent={true}
            opacity={0.5} // opacity는 transparent 불리언을 true로 변환한후에 조정할수있다.
            side={THREE.FrontSide} // 어떠한 면을 렌더링할지 결정할수있다.
            alphaTest={0.5}
            depthTest={true}
            depthWrite={true}
          />
        </mesh>

        {/* meshLambertMaterial */}
        <mesh>
          <meshLambertMaterial //빛의 영향을 받지 않는 재질이다
            color={"red"}
            visible={true}
            transparent={true}
            opacity={1} // opacity는 transparent 불리언을 true로 변환한후에 조정할수있다.
            side={THREE.FrontSide} // 어떠한 면을 렌더링할지 결정할수있다.
            alphaTest={0.5}
            depthTest={true}
            depthWrite={true}
            fog={false}
            emissive={"blue"} //재질자체에서 발산하는 색상.
          />
        </mesh>

        {/* meshPhongMaterial */}
        <mesh>
          <meshPhongMaterial //빛의 영향을 받지 않는 재질이다
            color={"red"}
            visible={true}
            transparent={true}
            opacity={1} // opacity는 transparent 불리언을 true로 변환한후에 조정할수있다.
            side={THREE.FrontSide} // 어떠한 면을 렌더링할지 결정할수있다.
            alphaTest={0.5}
            depthTest={true}
            depthWrite={true}
            fog={false}
            // emissive={"blue"} //재질자체에서 발산하는 색상.
            specular={"#fff"}
            shininess={80}
            flatShading={true}
          />
        </mesh>
        <mesh>
          <meshNormalMaterial />
          {/*노말벡터의 x,y,z값을 rgb로 바꾼값으로 표현한 재질이다.rgb로 면들이 부드럽게 이어졌는지 볼수있다. */}
        </mesh>

        {/*밑의 두 머테리얼들은 PBR(physically based rendering 물리 기반 렌더링) */}
        <mesh>
          <meshStandardMaterial
            color={"red"}
            visible={true}
            transparent={false}
            opacity={1} // opacity는 transparent 불리언을 true로 변환한후에 조정할수있다.
            side={THREE.FrontSide} // 어떠한 면을 렌더링할지 결정할수있다.
            alphaTest={0.5}
            depthTest={true}
            depthWrite={true}
            fog={false}
            emissive={"black"}
            roughness={0.1}
            metalness={0.3}
            flatShading={false}
          />
        </mesh>
        <mesh>
          <meshPhysicalMaterial
            color={"#fff"}
            visible={true}
            transparent={true}
            opacity={1} // opacity는 transparent 불리언을 true로 변환한후에 조정할수있다.
            side={THREE.FrontSide} // 어떠한 면을 렌더링할지 결정할수있다.
            alphaTest={0.5}
            depthTest={true}
            depthWrite={true}
            fog={false}
            emissive={"black"}
            roughness={0.1}
            metalness={0.3}
            clearcoat={1}
            clearcoatRoughness={0}
            transmission={1}
            thickness={controls.thickness}
            ior={2}
            //유리같은 재질을 표현할 수 있다.
          />
        </mesh>

        {/* 카메라의 거리에 따라서 변하는 머테리얼 */}
        <mesh>
          <meshDepthMaterial />
        </mesh>
      </group>
    </>
  );
};

export default ThreeElementScn;
