import React from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./scene";
import { Environment } from "../environment/environment";
import { ACESFilmicToneMapping, Color, sRGBEncoding } from "three";

const Rotating: React.FC = () => {
    return (
        <>
            <Canvas
                style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    zIndex: 1,
                    width: "100%",
                    height: "100%",
                }}
                gl={{
                    antialias: true,
                    depth: true,
                    alpha: true,
                    stencil: false,
                }}
                camera={{ fov: 45, position: [0, -0.1, 2.2] }}
                onCreated={({ gl, scene }) => {
                    gl.outputEncoding = sRGBEncoding;
                    gl.toneMapping = ACESFilmicToneMapping;
                    gl.toneMappingExposure = 1.5;
                    scene.background = new Color(0xeeeeee);
                }}
            >
                <Environment />
                <Scene />
            </Canvas>
        </>
    );
};

export default Rotating;
