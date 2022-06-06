import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { state } from "../rotating/state";

export const Controls: React.FC<{
    orbitRef: React.MutableRefObject<OrbitControls | null>;
}> = ({ orbitRef }) => {
    const { camera, gl } = useThree();

    useEffect(() => {
        const _controls = new OrbitControls(camera, gl.domElement);
        _controls.target.set(0, 0, 0);
        _controls.dampingFactor = 0.05;
        _controls.enableDamping = true;
        _controls.enableRotate = false;
        _controls.mouseButtons.LEFT = THREE.MOUSE.PAN;
        _controls.touches.ONE = THREE.TOUCH.PAN;
        orbitRef.current = _controls;
        state.controls = _controls;

        return () => {
            _controls.dispose();
        };
    }, [camera, gl, orbitRef]);

    useFrame(() => {
        if (!state.controls) return;
        state.controls.update();
    });
    return null;
};
