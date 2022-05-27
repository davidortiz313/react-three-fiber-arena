import React, { useEffect } from "react";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useThree } from "@react-three/fiber";

export const CameraDefaultPos: React.FC<{
    toggle: boolean;
    orbitRef: React.MutableRefObject<OrbitControls | null>;
}> = ({ toggle, orbitRef }) => {
    const { camera } = useThree();

    useEffect(() => {
        if (!orbitRef.current) return;
        gsap.to(camera.position, {
            duration: 0.5,
            x: 0,
            y: 0,
            onUpdate: () => {
                orbitRef.current!.target.set(
                    camera.position.x,
                    camera.position.y,
                    0
                );
            },
        });
        const zoom = { value: camera.zoom };
        gsap.to(zoom, {
            duration: 0.5,
            value: 500,
            onUpdate: () => {
                camera.zoom = zoom.value;
                camera.updateProjectionMatrix();
            },
        });
    }, [toggle, orbitRef, camera]);
    return null;
};
