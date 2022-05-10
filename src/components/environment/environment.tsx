import React from "react";
import { OrbitControls } from "@react-three/drei";
import { Environment as EnvironmentLoader } from "@react-three/drei";

export const Environment: React.FC = () => {
    return (
        <React.Fragment>
            <EnvironmentLoader
                background={false}
                path={"./assets/HDRI/"}
                files={"env.hdr"}
            />
            <ambientLight intensity={2} />

            <OrbitControls
                enableRotate={false}
                enableZoom={false}
                enablePan={false}
                minAzimuthAngle={3}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI}
            />
        </React.Fragment>
    );
};
