import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./scene";
import { Environment } from "./environment";
import { ACESFilmicToneMapping, Color, sRGBEncoding } from "three";
import useStore from "../../store/store";
import { EffectComposer, Vignette } from "@react-three/postprocessing";

const Rotating: React.FC = () => {
    const { playing, setPlaying, setIdle, controls } = useStore();
    const timerRef = useRef<number | null>(null);
    const [toggle] = useState(true);

    useEffect(() => {
        if (!controls) return;
        controls.enableRotate = true;
        setPlaying(false);
    }, [controls, setPlaying]);

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
                    !playing && setIdle(true);
                }}
                onPointerMove={() => {
                    if (timerRef.current) clearInterval(timerRef.current);
                    timerRef.current = window.setTimeout(() => {
                        setIdle(false);
                    }, 1000); // idle time 3s
                }}
            >
                <EffectComposer>
                    <Vignette eskil={false} offset={0.1} darkness={0.8} />
                </EffectComposer>
                <Environment />
                <Scene toggle={toggle} />
            </Canvas>
        </>
    );
};

export default Rotating;
