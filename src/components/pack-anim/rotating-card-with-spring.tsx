import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { Card } from "./card";
import { useSpring } from "@react-spring/three";

export const RotatingCard: React.FC<{ toggle: boolean }> = ({ toggle }) => {
    const cardRef = useRef<Group>(null);

    useEffect(() => {
        cardRef.current!.rotation.y = 0;
    }, []);

    useFrame((_, delta) => {
        if (!cardRef.current) return;
        const model = cardRef.current as Group;
        model.rotation.y += delta / 2;
    });

    return (
        <React.Fragment>
            <Card ref={cardRef} />
        </React.Fragment>
    );
};
