import React, { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import useStore from "../../store/store";

export const Controls: React.FC = () => {
    const { controls, setControls } = useStore();

    const { camera, gl } = useThree();

    useEffect(() => {
        const _controls = new OrbitControls(camera, gl.domElement);
        _controls.target0.set(0, -0.1, 0);
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
