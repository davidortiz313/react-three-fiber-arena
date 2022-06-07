import { useMemo } from "react";
import useGridStore from "../../../store/grid-store";
import { Line } from "./line";
import { state } from "../utils/state";

export function Edges({ pointData }: { pointData: any }) {
  const { grade, side } = useGridStore();
  const { edgeOffset, ratio } = state;

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
                [x1, 0],
                [x1, -edgeOffset],
              ],
              [
                [x1, -edgeOffset],
                [x2, -edgeOffset],
              ],
              [
                [x2, -edgeOffset],
                [x2, 0],
              ]
            );
            break;
          case "bottom":
            _lines.push(
              [
                [x1, 1],
                [x1, 1 + edgeOffset],
              ],
              [
                [x1, 1 + edgeOffset],
                [x2, 1 + edgeOffset],
              ],
              [
                [x2, 1 + edgeOffset],
                [x2, 1],
              ]
            );
            break;
          case "right":
            _lines.push(
              [
                [1, y1],
                [1 + edgeOffset * ratio, y1],
              ],
              [
                [1 + edgeOffset * ratio, y1],
                [1 + edgeOffset * ratio, y2],
              ],
              [
                [1 + edgeOffset * ratio, y2],
                [1, y2],
              ]
            );
            break;
          case "left":
            _lines.push(
              [
                [0, y1],
                [-edgeOffset * ratio, y1],
              ],
              [
                [-edgeOffset * ratio, y1],
                [-edgeOffset * ratio, y2],
              ],
              [
                [-edgeOffset * ratio, y2],
                [0, y2],
              ]
            );
            break;
        }
      }
    }
    return _lines;
  }, [grade, side, edgeOffset, pointData, ratio]);
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
