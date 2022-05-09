import React from "react";
import { OrbitControls } from "@react-three/drei";
import { Environment as EnvironmentLoader } from "@react-three/drei";

export const Environment: React.FC = () => {
    return (
        <React.Fragment>
            <EnvironmentLoader
                background={false}
                path={"./assets/HDRI/"}
                // files={"royal.hdr"}
                files={"small.hdr"}
            />
            <ambientLight intensity={2} />
            <directionalLight position={[3, 5, -3]} intensity={1} />
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={false}
            />
        </React.Fragment>
    );
};
