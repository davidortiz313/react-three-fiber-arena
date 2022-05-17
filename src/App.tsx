import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/scene/scene";
import { Environment } from "./components/environment/environment";
import {
    ACESFilmicToneMapping,
    Color,
    sRGBEncoding,
    TextureLoader,
} from "three";
import "./App.css";
import useStore from "./store/store";

const App: React.FC = () => {
    const { playing, setIdle, controls } = useStore();
    const timerRef = useRef<number | null>(null);
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
                    scene.background = new TextureLoader().load(
                        "./assets/background.png"
                    );
                    gl.outputEncoding = sRGBEncoding;
                    gl.toneMapping = ACESFilmicToneMapping;
                    gl.toneMappingExposure = 1.5;
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
                <Environment />
                <Scene toggle={toggle} />
            </Canvas>
            <div
                style={{
                    position: "absolute",
                    zIndex: 1,
                    bottom: "80px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <button
                    className="btn"
                    onClick={(e) => {
                        e.preventDefault();
                        setToggle((p) => !p);
                        controls!.enableDamping = false;
                    }}
                >
                    REVEAL NEXT CARD
                </button>
            </div>
            <div
                style={{
                    position: "absolute",
                    zIndex: 1,
                    bottom: "40px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <button className="transparentBbtn" onClick={(e) => {}}>
                    SIKP ANIMATION
                </button>
            </div>
        </>
    );
};

export default App;
