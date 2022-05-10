import React from "react";
import { Canvas } from "@react-three/fiber";
import { CardModel } from "./components/card-model/card-model";
import { Environment } from "./components/environment/environment";
import { Color, sRGBEncoding } from "three";
// import { KernelSize } from "postprocessing";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";

const App: React.FC = () => {
    return (
        <Canvas
            gl={{
                antialias: true,
                depth: true,
                alpha: false,
                stencil: false,
            }}
            camera={{ fov: 45, position: [0, 0, 2.5] }}
            onCreated={({ gl, scene }) => {
                scene.background = new Color(0xf6f6f6);
                gl.outputEncoding = sRGBEncoding;
                gl.toneMappingExposure = 2.5;
            }}
        >
            <Environment />
            <CardModel />

            {/* <EffectComposer multisampling={8}>
                <Bloom
                    kernelSize={3}
                    luminanceThreshold={0}
                    luminanceSmoothing={0.8}
                    intensity={1.4}
                />
                <Bloom
                    kernelSize={KernelSize.HUGE}
                    luminanceThreshold={0}
                    luminanceSmoothing={0}
                    intensity={0.5}
                />
            </EffectComposer> */}
        </Canvas>
    );
};

export default App;
