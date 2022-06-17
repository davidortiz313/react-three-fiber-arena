import { useMemo } from "react";
import { state } from "../utils/state";
import { useGridContext } from "../../../context/project-context";
import { Vector4 } from "three";
import { ShaderToy } from "../shaders/shader-toy";

export function Corner({ pointData }: { pointData: any }) {
  const { cornerLength, ratio } = state;
  const {
    data: { grade, side },
  } = useGridContext();

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
                [-cornerLength * ratio, cornerLength * 0.5],
              ],
              [
                [-cornerLength * ratio, -cornerLength],
                [cornerLength * 0.5 * ratio, -cornerLength],
              ]
            );
            break;
          case "topRight":
            _lines.push(
              [
                [1 + cornerLength * ratio, -cornerLength],
                [1 + cornerLength * ratio, cornerLength * 0.5],
              ],
              [
                [1 + cornerLength * ratio, -cornerLength],
                [1 - cornerLength * 0.5 * ratio, -cornerLength],
              ]
            );
            break;
          case "bottomLeft":
            _lines.push(
              [
                [-cornerLength * ratio, 1 + cornerLength],
                [-cornerLength * ratio, 1 - cornerLength * 0.5],
              ],
              [
                [-cornerLength * ratio, 1 + cornerLength],
                [cornerLength * 0.5 * ratio, 1 + cornerLength],
              ]
            );
            break;
          case "bottomRight":
            _lines.push(
              [
                [1 + cornerLength * ratio, 1 + cornerLength],
                [1 + cornerLength * ratio, 1 - cornerLength * 0.5],
              ],
              [
                [1 + cornerLength * ratio, 1 + cornerLength],
                [1 - cornerLength * 0.5 * ratio, 1 + cornerLength],
              ]
            );
            break;
          default:
            break;
        }
      }
    }
    return _lines.map(
      ([pt1, pt2]: any) =>
        new Vector4(
          state.getPos(pt1[0], pt1[1]).x,
          state.getPos(pt1[0], pt1[1]).y,

          state.getPos(pt2[0], pt2[1]).x,
          state.getPos(pt2[0], pt2[1]).y
        )
    );
  }, [grade, side, cornerLength, pointData, ratio]);
  return (
    <group>
      {/* {lines.map(([pt1, pt2]: any, idx: number) => (
        <Line
          key={idx}
          pt1={state.getPos(pt1[0], pt1[1])}
          pt2={state.getPos(pt2[0], pt2[1])}
        />
      ))} */}
      <ShaderToy edges={lines} />
    </group>
  );
}
