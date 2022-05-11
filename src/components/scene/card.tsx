import React, { Suspense, useMemo } from "react";
import { GroupProps, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
    Group,
    Mesh,
    MeshStandardMaterial,
    sRGBEncoding,
    TextureLoader,
} from "three";

export const Card = React.forwardRef<Group>((props: GroupProps, ref) => {
    const gltf = useLoader(GLTFLoader, "./assets/models/card.glb");

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

    const model = useMemo(() => {
        gltf.scene.traverse((child) => {
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
        gltf.scene.rotation.y = 0;
        return gltf.scene;
    }, [gltf, cardFrontMap, cardBackMap, labelFrontMap, labelBackMap]);

    return (
        <Suspense fallback={null}>
            <group ref={ref} {...props}>
                <primitive object={model} scale={0.1}></primitive>
            </group>
        </Suspense>
    );
});
