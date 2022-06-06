import React, { useCallback } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Line } from "./line";
import useGridStore from "../../store/grid-store";
import { data } from "./data";
import { state } from "./state";

export const Scene: React.FC = () => {
    const { side, kind, grade } = useGridStore();

    console.log("** Grid");

    const [frontMap, backMap] = useLoader(THREE.TextureLoader, [
        "./assets/front.jpg",
        "./assets/back.jpg",
    ]);
    const ratio = frontMap.image.height / frontMap.image.width;

    const [map, setMap] = useState(frontMap);

    const getPos = useCallback(
        (x: number, y: number) => {
            return [x - 0.5, (0.5 - y) * ratio, state.annotationHeight];
        },
        [ratio]
    );

    const dataFilteredByEdges = useCallback(() => {
        return data
            .map((ele: any) => ele.edges)
            .map((ele: any) => ele[`${side}`])
            .map((ele) => ({
                top: ele.top.labels.filter((e: any) => e.kind === kind),
                right: ele.right.labels.filter((e: any) => e.kind === kind),
                bottom: ele.bottom.labels.filter((e: any) => e.kind === kind),
                left: ele.left.labels.filter((e: any) => e.kind === kind),
            }));
    }, [kind, side]);

    const dataFilteredBySurface = useCallback(() => {
        return data
            .map((ele: any) => ele.surface)
            .map((ele: any) => ele[`${side}`]);
    }, [side]);

    const dataFilteredByCentering = useCallback(() => {
        return data
            .map((ele: any) => ele.centering)
            .map((ele: any) => ele[`${side}`]);
    }, [side]);

    useEffect(() => {
        setMap(side === "front" ? frontMap : backMap);
    }, [side, setMap, frontMap, backMap]);

    return (
        <group>
            <mesh>
                <planeBufferGeometry args={[1, 1 * ratio]} />
                <meshBasicMaterial map={map} />
            </mesh>

            {grade === "edges" &&
                dataFilteredByEdges().map((ele: any, idx: number) => {
                    return (
                        <group key={idx}>
                            {Object.keys(ele).map(
                                (key: string, idx: number) => {
                                    return ele[`${key}`].map(
                                        (
                                            { x1, x2, y1, y2 }: any,
                                            index: number
                                        ) => (
                                            <Line
                                                key={index}
                                                pt1={getPos(x1, y1)}
                                                pt2={getPos(x2, y2)}
                                            />
                                        )
                                    );
                                }
                            )}
                        </group>
                    );
                })}

            {grade === "surface" &&
                dataFilteredBySurface().map((ele: any, idx) => {
                    return (
                        <group key={idx}>
                            {ele.labels
                                .filter((ele: any) => ele.kind === kind)
                                .map(({ x, y, w, h }: any, index: number) => (
                                    <group key={index}>
                                        <Line
                                            pt1={getPos(x, y)}
                                            pt2={getPos(x + w, y)}
                                        />
                                        <Line
                                            pt1={getPos(x + w, y)}
                                            pt2={getPos(x + w, y + h)}
                                        />
                                        <Line
                                            pt1={getPos(x + w, y + h)}
                                            pt2={getPos(x, y + h)}
                                        />
                                        <Line
                                            pt1={getPos(x, y + h)}
                                            pt2={getPos(x, y)}
                                        />
                                    </group>
                                ))}
                        </group>
                    );
                })}

            {grade === "centering" &&
                dataFilteredByCentering().map(
                    ({ top, bottom, right, left }: any, index: number) => (
                        <group key={index}>
                            <Line
                                pt1={getPos(left, top)}
                                pt2={getPos(1 - right, top)}
                            />
                            <Line
                                pt1={getPos(1 - right, top)}
                                pt2={getPos(1 - right, 1 - bottom)}
                            />
                            <Line
                                pt1={getPos(1 - right, 1 - bottom)}
                                pt2={getPos(left, 1 - bottom)}
                            />
                            <Line
                                pt1={getPos(left, 1 - bottom)}
                                pt2={getPos(left, top)}
                            />
                        </group>
                    )
                )}
        </group>
    );
};
