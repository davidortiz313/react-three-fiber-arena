import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
    AnimationMixer,
    BackSide,
    Color,
    FrontSide,
    Mesh,
    MeshBasicMaterial,
    MeshStandardMaterial,
    sRGBEncoding,
    TextureLoader,
} from "three";

export const CardModel: React.FC = () => {
    const modelRef = useRef();
    const gltf = useLoader(GLTFLoader, "./assets/glTF/test.glb");

    const [frontMap, backMap, frontTopMap, backTopMap] = useLoader(
        TextureLoader,
        [
            "./assets/front.jpg",
            "./assets/back.jpg",
            "./assets/frontTop.png",
            "./assets/backTop.png",
        ]
    );
    frontMap.encoding = sRGBEncoding;
    backMap.encoding = sRGBEncoding;
    frontTopMap.encoding = sRGBEncoding;
    backTopMap.encoding = sRGBEncoding;

    const mixerRef = useRef<AnimationMixer | null>(null);

    useEffect(() => {
        const { animations, scene } = gltf;
        mixerRef.current = new AnimationMixer(scene);
        // animations.forEach((clip) => {
        //     const action = mixerRef.current!.clipAction(clip);
        //     action.play();
        //     action.timeScale = 0.2;
        // });
    }, [gltf]);

    useFrame((_, delta) => {
        // if (!mixerRef.current) return;
        // mixerRef.current.update(delta);

        if (!modelRef.current) return;
        const model = modelRef.current as Mesh;
        model.rotation.y += delta / 2;
    });

    const model = useMemo(() => {
        gltf.scene.traverse((child) => {
            if (child instanceof Mesh) {
                (child.material as MeshStandardMaterial).opacity = 0.2;
            }
        });
        return gltf.scene;
    }, [gltf]);

    return (
        <Suspense fallback={null}>
            <group>
                <primitive ref={modelRef} object={model} scale={0.1}>
                    <mesh name="Front Image" position={[0, -1.2, 0.01]}>
                        <planeGeometry args={[6.2, 8.9]} />
                        <meshStandardMaterial map={frontMap} roughness={0.1} />
                    </mesh>

                    <mesh
                        name="Back Image"
                        position={[0, -1.2, -0.01]}
                        rotation-y={-Math.PI}
                    >
                        <planeGeometry args={[6.2, 8.9]} />
                        <meshStandardMaterial map={backMap} />
                    </mesh>

                    <mesh name="Front Top" position={[0, 4.85, 0.1]}>
                        <planeGeometry args={[6.7, 1.9]} />
                        <meshBasicMaterial
                            map={frontTopMap}
                            transparent={true}
                            opacity={1}
                        />
                    </mesh>

                    <mesh
                        name="Back Top"
                        position={[0, 4.85, -0.1]}
                        rotation-y={-Math.PI}
                    >
                        <planeGeometry args={[6.7, 1.9]} />
                        <meshBasicMaterial
                            map={backTopMap}
                            transparent={true}
                            opacity={1}
                        />
                    </mesh>
                </primitive>
            </group>
        </Suspense>
    );
};
