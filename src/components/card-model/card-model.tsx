import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
    AnimationMixer,
    Mesh,
    MeshStandardMaterial,
    sRGBEncoding,
    TextureLoader,
} from "three";

export const CardModel: React.FC = () => {
    const modelRef = useRef();
    const animGltf = useLoader(GLTFLoader, "./assets/glTF/anim5.gltf");

    const [cardFrontMap, cardBackMap, labelFrontMap, labelBackMap] = useLoader(
        TextureLoader,
        [
            "./assets/front.jpg",
            "./assets/back.jpg",
            "./assets/frontTop.png",
            "./assets/backTop.png",
        ]
    );
    cardFrontMap.encoding = sRGBEncoding;
    cardBackMap.encoding = sRGBEncoding;
    labelFrontMap.encoding = sRGBEncoding;
    labelBackMap.encoding = sRGBEncoding;
    cardFrontMap.flipY = false;
    cardBackMap.flipY = false;
    labelFrontMap.flipY = false;
    labelBackMap.flipY = false;

    const mixerRef = useRef<AnimationMixer | null>(null);

    useFrame((_, delta) => {
        if (!mixerRef.current || !modelRef.current || !animGltf) return;
        mixerRef.current.update(delta);
    });

    const model = useMemo(() => {
        const { animations, scene } = animGltf;
        mixerRef.current = new AnimationMixer(scene);

        const action = mixerRef.current!.clipAction(animations[0]);
        action.play();

        animGltf.scene.traverse((child) => {
            if (child instanceof Mesh) {
                switch (child.name) {
                    case "card_front":
                        child.material = new MeshStandardMaterial({
                            map: cardFrontMap,
                        });
                        break;
                    case "card_back":
                        child.material = new MeshStandardMaterial({
                            map: cardBackMap,
                        });
                        break;
                    case "label-front":
                        child.material = new MeshStandardMaterial({
                            map: labelFrontMap,
                            transparent: true,
                        });
                        break;
                    case "label-back":
                        child.material = new MeshStandardMaterial({
                            map: labelBackMap,
                            transparent: true,
                        });
                        break;
                    default:
                        const mat = child.material as MeshStandardMaterial;
                        mat.roughness = 0.01;
                        mat.opacity = 0.2;
                        break;
                }
            }
        });
        console.log(animGltf.scene);
        return animGltf.scene;
    }, [animGltf]);

    return (
        <Suspense fallback={null}>
            <group>
                <primitive object={animGltf.scene} />
                <primitive ref={modelRef} object={model} scale={0.1}>
                    {/* <mesh name="Front Image" position={[0, -1.2, 0.01]}>
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
                    </mesh> */}
                </primitive>
            </group>
        </Suspense>
    );
};
