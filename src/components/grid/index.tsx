import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./scene";
import { Environment } from "../environment/environment";
import { ACESFilmicToneMapping, Color, sRGBEncoding } from "three";
import "./grid.css";
import useGridStore from "../../store/grid-store";
import { Controls } from "./utils/controls";
import { CameraDefaultPos } from "./utils/camera-default-pos";
import { state } from "./utils/state";

const Grid: React.FC = () => {
  const { dataIdx, setDataIdx, setSide, side, kind, setKind, grade, setGrade } =
    useGridStore();
  const [toggle, setToggle] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (kind === "center") setGrade("vertical");
    if (kind === "edge") setGrade("wear");
    if (kind === "surface") setGrade("spotting");
    if (kind === "corner") setGrade("rounding");
  }, [kind, setGrade]);

  return (
    <>
      <Canvas
        ref={canvasRef}
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
          const _canvas = canvasRef.current! as HTMLCanvasElement;
          state.screenSize = [_canvas.clientWidth, _canvas.clientHeight];
          gl.outputEncoding = sRGBEncoding;
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.5;
          scene.background = new Color(0x000000);
        }}
      >
        <Environment />
        <Scene />
        <CameraDefaultPos toggle={toggle} />
        <Controls />
      </Canvas>

      <div className="control-panel container border p-4">
        <div className="row m-0 p-0 d-flex justify-content-between text-white">
          <div className="form-check w-50">
            <input
              type="radio"
              className="form-check-input"
              name="side"
              id="frontSide"
              checked={side === "front"}
              onChange={(e) => {
                e.target.checked && setSide("front");
              }}
            />
            <label htmlFor="frontSide">Front</label>
          </div>
          <div className="form-check w-50 d-flex justify-content-end">
            <div>
              <input
                type="radio"
                className="form-check-input"
                id="backSide"
                name="side"
                checked={side === "back"}
                onChange={(e) => {
                  e.target.checked && setSide("back");
                }}
              />
              <label htmlFor="backSide">Back</label>
            </div>
          </div>
        </div>
        <div className="mt-4 row d-flex flex-column justify-content-between mt-1 p-0 text-white">
          <div className="d-flex flex-column justify-content-center">
            <div className="row m-0 p-0">DATA</div>
            <div className="row m-0 p-0">
              <select
                className="form-select"
                onChange={(e) => {
                  setDataIdx(e.target.value);
                }}
                value={dataIdx}
              >
                <option value="0">data 0</option>
                <option value="1">data 1</option>
                <option value="2">data 2</option>
                <option value="3">data 3</option>
                <option value="4">data 4</option>
              </select>
            </div>
          </div>
          <div className="mt-4 d-flex flex-column justify-content-center">
            <div className="row m-0 p-0">KIND</div>
            <div className="row m-0 p-0">
              <select
                className="form-select"
                onChange={(e) => {
                  setKind(e.target.value);
                }}
                value={kind}
              >
                {Object.keys(state.subgrades).map(
                  (ele: string, idx: number) => (
                    <option key={idx} value={ele}>
                      {ele}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div className="mt-4 d-flex flex-column justify-content-center">
            <div className="row m-0 p-0">SUBGRADE</div>
            <div className="row m-0 p-0">
              <select
                className="form-select"
                onChange={(e) => {
                  setGrade(e.target.value);
                }}
                value={grade}
              >
                {state.subgrades[`${kind}`].map(
                  (grade: string, idx: number) => (
                    <option key={idx} value={grade}>
                      {grade}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div className="mt-4 d-flex">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setToggle((p) => !p);
              }}
            >
              Reset Camera
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Grid;
