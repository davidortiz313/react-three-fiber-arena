import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Group } from "three";
import useStore from "../../store/store";
import { AnimatedCard } from "./animated-card";

export const Scene: React.FC<{ toggle: boolean }> = ({ toggle }) => {
    const {
        playing,
        setPlaying,
        rotating,
        setRotating,
        idle,
        setIdle,
        controls,
    } = useStore();

    const groupRef = useRef<Group | null>(null);

    // reset entire animation with togggle button
    useEffect(() => {
        setPlaying(true);
        setRotating(false);
        setIdle(false);
        groupRef.current!.rotation.y = 0;
        if (controls) {
            controls!.reset();
            controls!.enableDamping = true;
            controls!.enableRotate = false;
        }
    }, [toggle, controls, setPlaying, setRotating, setIdle]);

    // rotate the model if not idle state
    useFrame((_, delta) => {
        if (playing || !rotating || idle) return;
        groupRef.current!.rotation.y += 0.01;
    });

    // if animaion stops, start rotating
    useEffect(() => {
        if (playing) return;
        groupRef.current!.rotation.y = 0;
        setRotating(true);
    }, [playing, setRotating]);

    // reset control when idle --> rotate
    useEffect(() => {
        if (idle) return;
        controls?.reset();
        groupRef.current!.rotation.y = 0;
    }, [idle, controls]);

    return (
        <group ref={groupRef}>
            <AnimatedCard
                cardFront={"./assets/front.jpg"}
                cardBack={"./assets/back.jpg"}
                // labelFront={"./assets/frontTop.png"}
                // labelBack={"./assets/backTop.png"}
                labelFront={
                    "https://storage.googleapis.com/arenaxlab/labels/LeBronJames_Front-1.png"
                }
                labelBack={
                    "https://storage.googleapis.com/arenaxlab/labels/LeBronJames_Back-1.png"
                }
            />
        </group>
    );
};
