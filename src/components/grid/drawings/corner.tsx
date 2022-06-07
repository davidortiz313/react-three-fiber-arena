import { useMemo } from "react";
import useGridStore from "../../../store/grid-store";
import { Line } from "./line";
import { state } from "../utils/state";

export function Corner({ pointData }: { pointData: any }) {
  const { cornerLength, ratio } = state;
  const { grade, side } = useGridStore();

  const lines = useMemo(() => {
    const _lines: any[] = [];
    const { corners } = pointData;
    const labels = corners[`${side}`].labels;

    for (let key in labels) {
      if (labels[`${key}`][`${grade}`] !== "none") {
        switch (key) {
          case "topLeft":
            _lines.push(
              [
                [-cornerLength * ratio, -cornerLength],
                [-cornerLength * ratio, 0],
              ],
              [
                [-cornerLength * ratio, -cornerLength],
                [0, -cornerLength],
              ]
            );
            break;
          case "topRight":
            _lines.push(
              [
                [1 + cornerLength * ratio, -cornerLength],
                [1 + cornerLength * ratio, 0],
              ],
              [
                [1 + cornerLength * ratio, -cornerLength],
                [1, -cornerLength],
              ]
            );
            break;
          case "bottomLeft":
            _lines.push(
              [
                [-cornerLength * ratio, 1 + cornerLength],
                [-cornerLength * ratio, 1],
              ],
              [
                [-cornerLength * ratio, 1 + cornerLength],
                [0, 1 + cornerLength],
              ]
            );
            break;
          case "bottomRight":
            _lines.push(
              [
                [1 + cornerLength * ratio, 1 + cornerLength],
                [1 + cornerLength * ratio, 1],
              ],
              [
                [1 + cornerLength * ratio, 1 + cornerLength],
                [1, 1 + cornerLength],
              ]
            );
            break;
          default:
            break;
        }
      }
    }
    return _lines;
  }, [grade, side, cornerLength, pointData, ratio]);
  return (
    <group>
      {lines.map(([pt1, pt2]: any, idx: number) => (
        <Line
          key={idx}
          pt1={state.getPos(pt1[0], pt1[1])}
          pt2={state.getPos(pt2[0], pt2[1])}
        />
      ))}
    </group>
  );
}
