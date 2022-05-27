import React, { Suspense, useEffect, useRef } from "react";
import { GroupProps, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
    Group,
    Mesh,
    MeshStandardMaterial,
    sRGBEncoding,
    TextureLoader,
} from "three";

interface Props extends GroupProps {
    cardFront: string;
    cardBack: string;
    labelFront: string;
    labelBack: string;
}
export const Card: React.FC<Props> = ({
    cardFront,
    cardBack,
    labelFront,
    labelBack,
    ...rest
}) => {
    const groupRef = useRef<Group | null>(null);
    const gltf = useLoader(GLTFLoader, "./assets/models/card.gltf");

    const [cardFrontMap, cardBackMap, labelFrontMap, labelBackMap] = useLoader(
        TextureLoader,
        [cardFront, cardBack, labelFront, labelBack]
    );

    cardFrontMap.encoding = sRGBEncoding;
    cardBackMap.encoding = sRGBEncoding;
    labelFrontMap.encoding = sRGBEncoding;
    labelBackMap.encoding = sRGBEncoding;
    cardFrontMap.flipY = false;
    cardBackMap.flipY = false;
    labelFrontMap.flipY = false;
    labelBackMap.flipY = false;

    // add textures
    useEffect(() => {
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
                    case "label_front":
                        child.material = new MeshStandardMaterial({
                            map: labelFrontMap,
                            transparent: true,
                        });
                        break;
                    case "label_back":
                        child.material = new MeshStandardMaterial({
                            map: labelBackMap,
                            transparent: true,
                        });
                        break;
                    case "card_edge":
                        child.material = new MeshStandardMaterial({
                            color: 0xffffff,
                            transparent: true,
                            opacity: 0.5,
                        });
                        break;
                    case "label_edge":
                        child.material = new MeshStandardMaterial({
                            color: 0xffffff,
                            transparent: true,
                            opacity: 0.5,
                        });
                        break;
                    default:
                        const mat = child.material as MeshStandardMaterial;
                        mat.roughness = 0.01;
                        mat.metalness = 0.99;
                        mat.opacity = 0.2;
                        break;
                }
            }
        });
    }, [gltf, cardFrontMap, cardBackMap, labelFrontMap, labelBackMap]);

    return (
        <group ref={groupRef} {...rest}>
            <Suspense fallback={null}>
                <primitive object={gltf.scene} scale={0.1}></primitive>
            </Suspense>
        </group>
    );
};
