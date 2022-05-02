import React from "react";
import { OrbitControls } from "@react-three/drei";
import { Environment as EnvironmentLoader } from "@react-three/drei";

export const Environment: React.FC = () => {
    return (
        <React.Fragment>
            {/* <axesHelper args={[0.1]} /> */}
            <EnvironmentLoader
                background={false}
                path={"./assets/HDRI/"}
                files={"small.hdr"}
            />
            <ambientLight intensity={2} />
            <directionalLight position={[3, 5, -3]} intensity={0.6} />
            <OrbitControls enableDamping={false} />
        </React.Fragment>
    );
};
