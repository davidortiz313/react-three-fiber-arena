import React from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Line } from "./line";
import useGridStore from "../../store/grid-store";
import { data } from "./data";

export const Scene: React.FC = () => {
    const { side, pos, grade } = useGridStore();

    const edges = data.map((_) => _.edges);
    const front_edges = edges.map((_) => _.front);
    const back_edges = edges.map((_) => _.back);

    console.log(front_edges.map((_) => _.top).map((_) => _.labels));
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

            {
                front_edges
                    .map((_) => _.top)
                    .map((_) => _.labels)
                    .map((ele: any[], idx3) => (
                        <Line
                            key={idx3}
                            pt1={[
                                ele[0].x1 - 0.5,
                                ele[0].y1 + 0.5 * ratio,
                                0.01,
                            ]}
                            pt2={[
                                ele[0].x2 - 0.5,
                                ele[0].y2 + 0.5 * ratio,
                                0.01,
                            ]}
                        />
                    ))
                // front_edges.map
                // <Line
                //     pt1={[top.labels[0].x1, top.labels[0].y1, 0]}
                //     pt2={[top.labels[0].x2, top.labels[0].y2, 0]}
                // />
            }
            {front_edges
                .map((_) => _.left)
                .map((_) => _.labels)
                .map(
                    (ele: any[], idx3) =>
                        ele.length > 0 && (
                            <Line
                                key={idx3 * 100}
                                pt1={[
                                    ele[0].x1 - 0.5,
                                    -ele[0].y1 + 0.5 * ratio,
                                    0.01,
                                ]}
                                pt2={[
                                    ele[0].x2 - 0.5,
                                    -ele[0].y2 + 0.5 * ratio,
                                    0.01,
                                ]}
                            />
                        )
                )}

            {front_edges
                .map((_) => _.bottom)
                .map((_) => _.labels)
                .map(
                    (ele: any[], idx3) =>
                        ele.length > 0 && (
                            <Line
                                key={idx3 * 100}
                                pt1={[
                                    ele[0].x1 - 0.5,
                                    -ele[0].y1 + 0.5 * ratio,
                                    0.01,
                                ]}
                                pt2={[
                                    ele[0].x2 - 0.5,
                                    -ele[0].y2 + 0.5 * ratio,
                                    0.01,
                                ]}
                            />
                        )
                )}

            {front_edges
                .map((_) => _.right)
                .map((_) => _.labels)
                .map(
                    (ele: any[], idx3) =>
                        ele.length > 0 && (
                            <Line
                                key={idx3 * 100}
                                pt1={[
                                    ele[0].x1 - 0.5,
                                    -ele[0].y1 + 0.5 * ratio,
                                    0.01,
                                ]}
                                pt2={[
                                    ele[0].x2 - 0.5,
                                    -ele[0].y2 + 0.5 * ratio,
                                    0.01,
                                ]}
                            />
                        )
                )}
        </group>
    );
};
