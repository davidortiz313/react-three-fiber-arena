import React, { Suspense, useMemo, useRef } from "react";
import { GroupProps, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
    AnimationMixer,
    Mesh,
    MeshStandardMaterial,
    sRGBEncoding,
    TextureLoader,
} from "three";

export const PackAnimCard: React.FC<GroupProps> = ({ ...rest }) => {
    const modelRef = useRef();

    const packAnimGltf = useLoader(
        GLTFLoader,
        "./assets/models/pack-anim.gltf"
    );

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
        if (!mixerRef.current || !modelRef.current || !packAnimGltf) return;
        mixerRef.current.update(delta);
    });

    const packAnimModel = useMemo(() => {
        const { animations, scene } = packAnimGltf;
        mixerRef.current = new AnimationMixer(scene);

        const action = mixerRef.current!.clipAction(animations[0]);
        action.play();

        packAnimGltf.scene.traverse((child) => {
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
        return packAnimGltf.scene;
    }, [packAnimGltf, cardFrontMap, cardBackMap, labelFrontMap, labelBackMap]);

    return (
        <Suspense fallback={null}>
            <group name="pack-animation" {...rest}>
                <primitive
                    ref={modelRef}
                    object={packAnimModel}
                    scale={0.1}
                ></primitive>
            </group>
        </Suspense>
    );
};
