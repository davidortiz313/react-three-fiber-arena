import React from "react";
import { Environment as EnvironmentLoader } from "@react-three/drei";
import { Controls } from "./controls";

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
