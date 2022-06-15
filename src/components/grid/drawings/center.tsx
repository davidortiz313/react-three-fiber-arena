import { useMemo } from "react";
import { Line } from "./line";
import { state } from "../utils/state";
import { useGridContext } from "../../../context/project-context";
import { Lines } from "./lines";

export function Center({ pointData }: { pointData: any }) {
  const {
    data: { grade, side },
  } = useGridContext();

  const { lines, points } = useMemo(() => {
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
    return { lines: _lines, points: _pts };
  }, [grade, side, pointData]);
  return (
    <group>
      {/* {lines.map(([pt1, pt2]: any, idx: number) => (
        <Line
          key={idx}
          pt1={state.getPos(pt1[0], pt1[1])}
          pt2={state.getPos(pt2[0], pt2[1])}
        />
      ))} */}

      {points.map((point: any, index: number) => (
        <Lines key={index} pts={point} />
      ))}
    </group>
  );
}
