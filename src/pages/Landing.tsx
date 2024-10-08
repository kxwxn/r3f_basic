import "./Landing.css";
import React from "react";
import { Canvas } from "@react-three/fiber";
import ThreeElement from "../ThreeElement";
import { OrbitControls } from "@react-three/drei";
import { AxesHelper, GridHelper } from "three";
import { useControls } from "leva";
import MaterialTest from "../MaterialTest";
import LightTest from "../LightTest";
import InteractionTest from "../InteractionTest";

const Landing = () => {
  const color = useControls({ background: "black" });
  const grid = useControls({
    segment: { value: 50, min: 2, max: 100, step: 1 },
  });

  return (
    <div>
      <Canvas
        shadows
        // orthographic -- 2D 카메라
        camera={{
          // zoom: 100,
          near: 1,
          far: 150,
          fov: 75, // otrhographic 속성에는 영향을 주지 않는다(2D카메라이기 때문에 각도가 상관없다. 대신 zoom으로 설정)
          position: [5, 5, 0],
        }}
      >
        <axesHelper args={[5]} />
        <gridHelper
          args={[50, grid.segment, 0xff0000, "white"]}
          position-y={-1}
        />
        <OrbitControls
        // minAzimuthAngle={180}
        // maxAzimuthAngle={180}
        // minPolarAngle={180}
        // maxPolarAngle={180}
        />
        <color attach={"background"} args={[color.background]} />
        {/* <ThreeElement /> */}
        {/* <MaterialTest /> */}
        {/* <LightTest /> */}
        <InteractionTest />
      </Canvas>
    </div>
  );
};

export default Landing;
