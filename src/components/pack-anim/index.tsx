import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./scene";
import { Environment } from "./environment";
import { ACESFilmicToneMapping, sRGBEncoding } from "three";
import "../../App.css";
import {
  PackAnimContext,
  usePackAnimState,
} from "../../context/project-context";

const PackAnim: React.FC = () => {
  const packAnimState = usePackAnimState();
  const {
    data: { playing, state },
    updateData,
  } = packAnimState;
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div
        style={{ height: "100%" }}
        onPointerDown={() => {
          !playing && updateData({ idle: true });
        }}
        onPointerMove={() => {
          if (state.timer) {
            clearInterval(state.timer);
            state.timer = null;
          }
          state.timer = window.setTimeout(() => {
            updateData({ idle: false });
          }, 1000); // idle time 3s
        }}
      >
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
          camera={{ fov: 45, position: [0, 0.1, 2.2] }}
          onCreated={({ gl }) => {
            gl.outputEncoding = sRGBEncoding;
            gl.toneMapping = ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.5;
          }}
        >
          <PackAnimContext.Provider value={packAnimState}>
            <Environment />
            <Scene toggle={toggle} />
          </PackAnimContext.Provider>
        </Canvas>
      </div>
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: -1,
          width: "100%",
          height: "100%",
          backgroundImage: "url('./assets/background.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <video
          style={{
            objectFit: "fill",
            width: "100%",
            height: "100%",
          }}
          src="./assets/video_bg.mp4"
          autoPlay
          muted
          loop
        />
      </div>

      <div
        style={{
          position: "absolute",
          zIndex: 2,
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
            state.controls.enableDamping = false;
          }}
        >
          REVEAL NEXT CARD
        </button>
      </div>

      <div
        style={{
          position: "absolute",
          zIndex: 2,
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

export default PackAnim;
