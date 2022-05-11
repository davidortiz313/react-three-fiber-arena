import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/scene/scene";
import { Environment } from "./components/environment/environment";
import { ACESFilmicToneMapping, Color, sRGBEncoding } from "three";
// import { KernelSize } from "postprocessing";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";
import "./App.css";

const App: React.FC = () => {
    const [toggle, setToggle] = useState(false);
    return (
        <>
            <Canvas
                gl={{
                    antialias: true,
                    depth: true,
                    alpha: false,
                    stencil: false,
                }}
                camera={{ fov: 45, position: [0, 0, 2.5] }}
                onCreated={({ gl, scene }) => {
                    scene.background = new Color(0xffffff);
                    gl.outputEncoding = sRGBEncoding;
                    gl.toneMapping = ACESFilmicToneMapping;
                    gl.toneMappingExposure = 1.5;
                }}
            >
                <Environment toggle={toggle} />
                <Scene toggle={toggle} />

                {/* <EffectComposer multisampling={8}>
                <Bloom
                    kernelSize={3}
                    luminanceThreshold={0}
                    luminanceSmoothing={0.4}
                    intensity={0.6}
                />
                <Bloom
                    kernelSize={KernelSize.HUGE}
                    luminanceThreshold={0}
                    luminanceSmoothing={0}
                    intensity={0.5}
                />
            </EffectComposer> */}
            </Canvas>
            <div
                style={{
                    position: "absolute",
                    zIndex: 1,
                    bottom: "10px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <button
                    className="btn"
                    onClick={() => {
                        setToggle((p) => !p);
                    }}
                >
                    {toggle ? "Stop" : "Play"}
                </button>
            </div>
        </>
    );
};

export default App;
