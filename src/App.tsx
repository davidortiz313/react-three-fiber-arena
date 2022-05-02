import React from "react";
import { Canvas } from "@react-three/fiber";
import { CardModel } from "./components/card-model/card-model";
import { Environment } from "./components/environment/environment";
import { Color } from "three";

const App: React.FC = () => {
    return (
        <Canvas
            gl={{
                powerPreference: "high-performance",
                antialias: true,
                depth: true,
                alpha: false,
                stencil: false,
            }}
            camera={{ fov: 45, position: [0, 0, 4] }}
            onCreated={({ scene }) => {
                scene.background = new Color(0xf6f6f6);
            }}
        >
            <Environment />
            <CardModel />
        </Canvas>
    );
};

export default App;
