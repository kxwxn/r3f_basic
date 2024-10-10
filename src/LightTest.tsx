import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Environment, useHelper, useTexture } from "@react-three/drei";
import * as THREE from "three";

const LightTest = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  //   const meshCopyRefFirst = useRef<THREE.Mesh>(null);
  //   const meshCopyRefSecond = useRef<THREE.Mesh>(null);

  const matcap = useTexture("./img/matcap1.jpg");

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

  const dLight = useRef<THREE.DirectionalLight>(null!);
  useHelper(dLight, THREE.DirectionalLightHelper);
  const sLight = useRef<THREE.SpotLight>(null!);
  useHelper(sLight, THREE.SpotLightHelper);

  return (
    <>
      // Light
      {/* <fog attach={"fog"} args={["grey", 10, 4]} /> */}
      <directionalLight
        ref={dLight}
        position={[5, 5, 5]}
        intensity={2}
        target-position={[4, 0, 0]}
        castShadow
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-mapSize={[512, 512]}
      />
      {/* <ambientLight intensity={5} color={"white"} /> */}
      {/* 주변광,간접광 같은 효과(지오메트리의 형태만 보이게한다) */}
      {/* <hemisphereLight args={["blue", "yellow", 2]} /> */}
      {/* <pointLight
            color={'white'}
            intensity={50}
            position={[4,5,0]}
            distance={10}
      /> */}
      {/* <spotLight
        ref={sLight}
        distance={10}
        target-position={[4, 0, 0]}
        position={[4, 5, 0]}
        intensity={100}
        penumbra={0.8}
        angle={THREE.MathUtils.degToRad(50)}
      /> */}
      //Environment
      {/* <Environment files={"./img/hdr1.hdr"} background blur={0} /> */}
      //Shadow: DirectionalLight, PointLight, SpotLight
      <mesh
        rotation-x={[THREE.MathUtils.degToRad(-90)]}
        position-y={-1}
        receiveShadow
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color={"#7c4700"} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[0.5, 0.18]} />
        <meshBasicMaterial wireframe color={"red"} visible={false} />
      </mesh>
      <group ref={groupRef}>
        {/* meshLambertMaterial */}
        <mesh castShadow receiveShadow>
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
            // emissive={"blue"} //재질자체에서 발산하는 색상.
          />
        </mesh>

        {/* meshPhongMaterial */}
        <mesh castShadow receiveShadow>
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

        {/*밑의 두 머테리얼들은 PBR(physically based rendering 물리 기반 렌더링) */}
        <mesh castShadow receiveShadow>
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
        <mesh castShadow receiveShadow>
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
            thickness={0.5}
            ior={2}
            //유리같은 재질을 표현할 수 있다.
          />
        </mesh>
        <mesh castShadow receiveShadow>
          <meshToonMaterial />
        </mesh>
      </group>
    </>
  );
};

export default LightTest;
