import React, { useEffect } from "react";
import { Environment as EnvironmentLoader } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useFrame, useThree } from "@react-three/fiber";
import useStore from "../../store/store";

export const Controls: React.FC = () => {
    const { controls, setControls } = useStore();

    const { camera, gl } = useThree();

    useEffect(() => {
        const _controls = new OrbitControls(camera, gl.domElement);
        _controls.target0.set(0, 0, 0);
        _controls.dampingFactor = 0.05;
        _controls.enableDamping = true;
        _controls.enablePan = false;
        _controls.enableZoom = false;
        _controls.enableRotate = false;

        setControls(_controls);

        return () => {
            _controls.dispose();
        };
    }, [camera, gl, setControls]);

    useFrame(() => {
        if (!controls) return;
        controls.update();
    });
    return null;
};

export const Environment: React.FC = () => {
    return (
        <React.Fragment>
            <EnvironmentLoader
                background={false}
                path={"./assets/HDRI/"}
                files={"small.hdr"}
            />
            <ambientLight intensity={2} />
            <directionalLight position={[3, 5, -3]} intensity={1} />
            <Controls />
        </React.Fragment>
    );
};
