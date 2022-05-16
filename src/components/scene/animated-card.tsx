import React, { Suspense, useEffect, useRef } from "react";
import { GroupProps, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
    AnimationMixer,
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
    const gltf = useLoader(GLTFLoader, "./assets/models/new2.gltf");

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
                        mat.opacity = 0.2;
                        break;
                }
            }
        });
    }, [gltf, cardFrontMap, cardBackMap, labelFrontMap, labelBackMap]);

    // play animation
    useEffect(() => {
        const { animations, scene } = gltf;
        mixerRef.current = new AnimationMixer(scene);
        const action = mixerRef.current!.clipAction(animations[0]);
        durationRef.current = animations[0].duration;
        action.setLoop(LoopOnce, 1);
        action.clampWhenFinished = true;

        if (playing) {
            action.stop();
            mixerRef.current!.time = 0;
            action.play();
        }
    }, [gltf, playing]);

    // update animation mixer
    useFrame((_, delta) => {
        if (!mixerRef.current || !durationRef.current) return;
        if (mixerRef.current.time > durationRef.current && playing) {
            setPlaying(false);
            controls!.enableRotate = true;
        }
        playing && mixerRef.current.update(0.017);
    });

    return (
        <group ref={groupRef} {...rest}>
            <Suspense fallback={null}>
                <primitive object={gltf.scene} scale={0.1}></primitive>
            </Suspense>
        </group>
    );
};
