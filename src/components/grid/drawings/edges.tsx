import { useMemo } from "react";
import useGridStore from "../../../store/grid-store";
import { Line } from "./line";
import { state } from "../utils/state";

export function Edges({ pointData }: { pointData: any }) {
  const { grade, side } = useGridStore();
  const { edgeOffset, ratio, edgeGap } = state;

  const lines = useMemo(() => {
    const _lines: any[] = [];
    const { edges } = pointData;
    for (let edgeSide in edges[`${side}`]) {
      const labels = edges[`${side}`][`${edgeSide}`].labels;
      const pts = labels.filter((ele: any) => ele.kind === grade);
      if (pts.length > 0) {
        const { x1, x2, y1, y2 } = pts[0];
        switch (edgeSide) {
          case "top":
            _lines.push(
              [
                [x1, -edgeGap],
                [x1, -edgeOffset],
              ],
              [
                [x1, -edgeOffset],
                [x2, -edgeOffset],
              ],
              [
                [x2, -edgeOffset],
                [x2, -edgeGap],
              ]
            );
            break;
          case "bottom":
            _lines.push(
              [
                [x1, 1 + edgeGap],
                [x1, 1 + edgeOffset],
              ],
              [
                [x1, 1 + edgeOffset],
                [x2, 1 + edgeOffset],
              ],
              [
                [x2, 1 + edgeOffset],
                [x2, 1 + edgeGap],
              ]
            );
            break;
          case "right":
            _lines.push(
              [
                [1 + edgeGap * ratio, y1],
                [1 + edgeOffset * ratio, y1],
              ],
              [
                [1 + edgeOffset * ratio, y1],
                [1 + edgeOffset * ratio, y2],
              ],
              [
                [1 + edgeOffset * ratio, y2],
                [1 + edgeGap * ratio, y2],
              ]
            );
            break;
          case "left":
            _lines.push(
              [
                [-edgeGap * ratio, y1],
                [-edgeOffset * ratio, y1],
              ],
              [
                [-edgeOffset * ratio, y1],
                [-edgeOffset * ratio, y2],
              ],
              [
                [-edgeOffset * ratio, y2],
                [-edgeGap * ratio, y2],
              ]
            );
            break;
        }
      }
    }
    return _lines;
  }, [grade, side, edgeOffset, edgeGap, pointData, ratio]);
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
