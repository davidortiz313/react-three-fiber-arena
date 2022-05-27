import React from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Line } from "./line";
import useGridStore from "../../store/grid-store";
import { data } from "./data";

export const Scene: React.FC = () => {
    const { side, kind, grade } = useGridStore();

    const filteredEdge = data
        .map((_: any) => _.edges)
        .map((ele: any) => ele[`${side}`])
        .map((ele) => ({
            top: ele.top.labels.filter((e: any) => e.kind === kind),
            right: ele.right.labels.filter((e: any) => e.kind === kind),
            bottom: ele.bottom.labels.filter((e: any) => e.kind === kind),
            left: ele.left.labels.filter((e: any) => e.kind === kind),
        }));
    // .filter(
    //     ({ top, right, bottom, left }: any) =>
    //         top.length && right.length && left.length && bottom.length
    // );

    console.log(filteredEdge);
    const [frontMap, backMap] = useLoader(THREE.TextureLoader, [
        "./assets/front.jpg",
        "./assets/back.jpg",
    ]);

    const [ratio, setRatio] = useState(1);
    const [map, setMap] = useState(frontMap);

    useEffect(() => {
        setRatio(map.image.height / map.image.width);
    }, [setRatio, map]);

    useEffect(() => {
        setMap(side === "front" ? frontMap : backMap);
    }, [side, setMap, frontMap, backMap]);

    return (
        <group>
            <mesh>
                <planeBufferGeometry args={[1, 1 * ratio]} />
                <meshBasicMaterial map={map} />
            </mesh>

            {filteredEdge.map((ele: any, idx: number) => {
                return (
                    <group key={idx}>
                        {Object.keys(ele).map((key: string, idx: number) => {
                            return ele[`${key}`].map(
                                ({ x1, x2, y1, y2 }: any, index: number) => (
                                    <Line
                                        key={index}
                                        pt1={[
                                            x1 - 0.5,
                                            ratio * (0.5 - y1),
                                            0.01,
                                        ]}
                                        pt2={[
                                            x2 - 0.5,
                                            ratio * (0.5 - y2),
                                            0.01,
                                        ]}
                                    />
                                )
                            );
                        })}
                    </group>
                );
            })}
        </group>
    );
};
