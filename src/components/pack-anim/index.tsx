import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./scene";
import { Environment } from "../environment/environment";
import { ACESFilmicToneMapping, sRGBEncoding } from "three";
import useStore from "../../store/store";
import "../../App.css";

const PackAnim: React.FC = () => {
  const { playing, setIdle, controls } = useStore();
  const timerRef = useRef<number | null>(null);
  const [toggle, setToggle] = useState(false);
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
        camera={{ fov: 45, position: [0, 0.1, 2.2] }}
        onCreated={({ gl, scene }) => {
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
            controls!.enableDamping = false;
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
