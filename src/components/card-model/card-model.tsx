import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer, Color, Mesh, MeshBasicMaterial } from "three";

export const CardModel: React.FC = () => {
    const gltf = useLoader(GLTFLoader, "./assets/glTF/test.gltf");
    const mixerRef = useRef<AnimationMixer | null>(null);

    useEffect(() => {
        const { animations, scene } = gltf;
        mixerRef.current = new AnimationMixer(scene);
        animations.forEach((clip) => {
            const action = mixerRef.current!.clipAction(clip);
            action.play();
            action.timeScale = 0.2;
        });
    }, [gltf]);

    useFrame((_, delta) => {
        if (!mixerRef.current) return;
        mixerRef.current.update(delta);
    });

    const model = useMemo(() => {
        gltf.scene.traverse((child) => {
            if (child instanceof Mesh) {
                (child.material as MeshBasicMaterial).opacity = 0.4;
            }
        });
        return gltf.scene;
    }, [gltf]);

    return (
        <Suspense fallback={null}>
            <primitive object={model} scale={0.1} />
        </Suspense>
    );
};
