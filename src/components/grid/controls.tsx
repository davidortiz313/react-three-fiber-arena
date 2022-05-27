import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

export const Controls: React.FC<{
    orbitRef: React.MutableRefObject<OrbitControls | null>;
}> = ({ orbitRef }) => {
    const [controls, setControls] = useState<OrbitControls>();

    const { camera, gl } = useThree();

    useEffect(() => {
        const _controls = new OrbitControls(camera, gl.domElement);
        _controls.target.set(0, 0, 0);
        _controls.dampingFactor = 0.05;
        _controls.enableDamping = true;
        _controls.mouseButtons.LEFT = THREE.MOUSE.PAN;
        orbitRef.current = _controls;
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
