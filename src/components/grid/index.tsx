import React from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./scene";
import { Environment } from "../environment/environment";
import { ACESFilmicToneMapping, Color, sRGBEncoding } from "three";
import "./grid.css";
import useGridStore from "../../store/grid-store";

const Grid: React.FC = () => {
    const { setSide, setPos, setGrade } = useGridStore();

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
                // orthographic
                camera={{ fov: 45, position: [0, 0, 2.2] }}
                // camera={{ zoom: 500, position: [0, 0, 100] }}
                onCreated={({ gl, scene, camera }) => {
                    gl.outputEncoding = sRGBEncoding;
                    gl.toneMapping = ACESFilmicToneMapping;
                    gl.toneMappingExposure = 1.5;
                    scene.background = new Color(0x000000);
                }}
            >
                <Environment />
                <Scene />
            </Canvas>

            <div className="control-panel">
                <div className="row m-0 p-0 flex d-flex justify-content-between">
                    <div className="col-5 flex d-flex justify-content-center">
                        <button
                            className="btn btn-primary"
                            style={{ width: "100px" }}
                            onClick={() => {
                                setSide("front");
                            }}
                        >
                            Front
                        </button>
                    </div>
                    <div className="col-5 flex d-flex justify-content-center">
                        <button
                            className="btn btn-primary"
                            style={{ width: "100px" }}
                            onClick={() => {
                                setSide("back");
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
                <div className="row d-flex justify-content-between mt-1 p-0 text-white">
                    <div className="col-5 d-flex flex-column justify-content-center">
                        <div className="row m-0 p-0">Position</div>
                        <div className="row m-0 p-0">
                            <select className="form-control">
                                <option value="center">Center 10</option>
                                <option value="edge">Edge 9.5</option>
                                <option value="corner">Corner 10</option>
                                <option value="surface">Surface 10</option>
                                <option value="auto">Auto 10</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-5 d-flex flex-column justify-content-center">
                        <div className="row m-0 p-0">Surface Subgrade</div>
                        <div className="row m-0 p-0">
                            <select className="form-control">
                                <option value="spotting">Spotting</option>
                                <option value="print-line">Print Line</option>
                                <option value="scratch">Scratch</option>
                                <option value="bent">Bent</option>
                                <option value="dent">Dent</option>
                                <option value="crease">Crease</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Grid;
