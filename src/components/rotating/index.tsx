import React, { useCallback, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./scene";
import { Environment } from "./environment";
import { ACESFilmicToneMapping, Color, sRGBEncoding } from "three";
import useStore from "../../store/rotate-store";

const Rotating: React.FC = () => {
    const { rotating, setRotating } = useStore();
    const timerRef = useRef<number | null>(null);
    const reset = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = window.setTimeout(() => {
            setRotating(true);
            timerRef.current = null;
        }, 1000); // idle time 3s
    }, [rotating, setRotating]);

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
                camera={{ fov: 45, position: [0, 0, 2.2] }}
                onCreated={({ gl, scene }) => {
                    gl.outputEncoding = sRGBEncoding;
                    gl.toneMapping = ACESFilmicToneMapping;
                    gl.toneMappingExposure = 1.5;
                    scene.background = new Color(0xffffff);
                }}
                onPointerDown={() => {
                    reset();
                    setRotating(false);
                }}
                onPointerMove={reset}
            >
                <Environment />
                <Scene />
            </Canvas>
        </>
    );
};

export default Rotating;
