import React, { useEffect, useState } from "react";
import { Environment as EnvironmentLoader } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useFrame, useThree } from "@react-three/fiber";

export const Environment: React.FC<{ toggle: boolean }> = ({ toggle }) => {
    const { camera, gl } = useThree();
    const [controls, setControls] = useState<OrbitControls>();

    useEffect(() => {
        const _controls = new OrbitControls(camera, gl.domElement);
        _controls.enableDamping = true;
        _controls.dampingFactor = 0.05;
        _controls.enablePan = false;
        setControls(_controls);

        return () => {
            _controls.dispose();
        };
    }, [camera, gl, setControls]);

    useEffect(() => {
        if (!controls) return;
        if (toggle) {
            controls.reset();
        }
        controls.enableRotate = !toggle;
    }, [controls, toggle]);

    useFrame(() => {
        if (!controls) return;
        controls.update();
    });

    return (
        <React.Fragment>
            <EnvironmentLoader
                background={false}
                path={"./assets/HDRI/"}
                files={"small.hdr"}
            />
            <ambientLight intensity={2} />
            <directionalLight position={[3, 5, -3]} intensity={1} />
        </React.Fragment>
    );
};
