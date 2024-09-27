import React from "react";
import { Canvas } from "@react-three/fiber";
import ThreeElement from "../ThreeElement";

const Landing = () => {
  return (
    <div>
      <Canvas>
        <ThreeElement />
      </Canvas>
    </div>
  );
};

export default Landing;
