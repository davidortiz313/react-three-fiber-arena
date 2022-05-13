import React, { Suspense, useEffect, useRef, useState } from "react";
import { GroupProps, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
    AnimationAction,
    AnimationMixer,
    Color,
    Group,
    LoopOnce,
    Mesh,
    MeshStandardMaterial,
    sRGBEncoding,
    TextureLoader,
} from "three";
import useStore from "../../store/store";

interface Props extends GroupProps {
    cardFront: string;
    cardBack: string;
    labelFront: string;
    labelBack: string;
}
export const AnimatedCard: React.FC<Props> = ({
    cardFront,
    cardBack,
    labelFront,
    labelBack,
    ...rest
}) => {
    const { playing, setPlaying, controls } = useStore();

    const groupRef = useRef<Group | null>(null);
    const mixerRef = useRef<AnimationMixer | null>(null);
    const gltf = useLoader(GLTFLoader, "./assets/models/new1.gltf");

    const [action, setAction] = useState<AnimationAction>();
    const durationRef = useRef<number>();

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
                    default:
                        const mat = child.material as MeshStandardMaterial;
                        mat.roughness = 0.01;
                        mat.metalness = 0.99;
                        mat.opacity = 0.1;
                        break;
                }
            }
        });
    }, [gltf, cardFrontMap, cardBackMap, labelFrontMap, labelBackMap]);

    // play animation
    useEffect(() => {
        if (!action) {
            const { animations, scene } = gltf;
            mixerRef.current = new AnimationMixer(scene);
            const _action = mixerRef.current!.clipAction(animations[0]);
            durationRef.current = animations[0].duration;
            _action.setLoop(LoopOnce, 1);
            _action.clampWhenFinished = true;
            setAction(_action);
        }

        if (action && playing) {
            action.stop();
            mixerRef.current!.time = 0;
            action.play();
            console.log("start play");
        }
    }, [gltf, action, playing, setAction]);

    // update animation mixer
    useFrame((_, delta) => {
        if (!mixerRef.current || !durationRef.current) return;
        if (mixerRef.current.time > durationRef.current && playing) {
            setPlaying(false);
            controls!.enableRotate = true;
        }

        playing && mixerRef.current.update(delta);
    });

    return (
        <group ref={groupRef} {...rest}>
            <Suspense fallback={null}>
                <primitive object={gltf.scene} scale={0.1}></primitive>
            </Suspense>
        </group>
    );
};
