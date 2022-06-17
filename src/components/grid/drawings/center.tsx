import { useMemo } from "react";
import { state } from "../utils/state";
import { useGridContext } from "../../../context/project-context";
import { ShaderToy } from "../shaders/shader-toy";
import { Vector4 } from "three";

export function Center({ pointData }: { pointData: any }) {
  const {
    data: { grade, side },
  } = useGridContext();

  const { lines } = useMemo(() => {
    const _lines: any[] = [];
    const _pts: any[] = [];
    const { centering } = pointData;
    const { top, left, bottom, right } = centering[`${side}`];
    switch (grade) {
      case "vertical":
        _lines.push(
          [
            [left, -state.edgeOffset],
            [left, 1 + state.edgeOffset],
          ],
          [
            [1 - right, -state.edgeOffset],
            [1 - right, 1 + state.edgeOffset],
          ]
        );
        _pts.push(
          [
            state._getPos(left, -state.edgeOffset),
            state._getPos(left, 1 + state.edgeOffset),
          ],
          [
            state._getPos(1 - right, -state.edgeOffset),
            state._getPos(1 - right, 1 + state.edgeOffset),
          ]
        );
        break;
      case "horizontal":
        _lines.push(
          [
            [-state.edgeOffset, top],
            [1 + state.edgeOffset, top],
          ],
          [
            [-state.edgeOffset, 1 - bottom],
            [1 + state.edgeOffset, 1 - bottom],
          ]
        );
        _pts.push(
          [
            state._getPos(-state.edgeOffset, top),
            state._getPos(1 + state.edgeOffset, top),
          ],
          [
            state._getPos(-state.edgeOffset, 1 - bottom),
            state._getPos(1 + state.edgeOffset, 1 - bottom),
          ]
        );

        break;
      default:
        break;
    }
    return {
      lines: _lines.map(
        ([pt1, pt2]: any) =>
          new Vector4(
            state.getPos(pt1[0], pt1[1]).x,
            state.getPos(pt1[0], pt1[1]).y,

            state.getPos(pt2[0], pt2[1]).x,
            state.getPos(pt2[0], pt2[1]).y
          )
      ),
      points: _pts,
    };
  }, [grade, side, pointData]);
  return (
    <group>
      <ShaderToy edges={lines} />
    </group>
  );
}
