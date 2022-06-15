import { useMemo } from "react";
import { Line } from "./line";
import { state } from "../utils/state";
import { useGridContext } from "../../../context/project-context";
import { Lines } from "./lines";

export function Surface({ pointData }: { pointData: any }) {
  const {
    data: { grade, side },
  } = useGridContext();

  const { lines, points } = useMemo(() => {
    const _lines: any[] = [];
    const _pts: any[] = [];
    const { surface } = pointData;
    const labels = surface[`${side}`].labels.filter(
      (ele: any) => ele.kind === grade
    );
    labels.forEach((ele: any, idx: number) => {
      const { x, y, w, h } = ele;
      _lines.push(
        [
          [x, y],
          [x + w, y],
        ],
        [
          [x + w, y],
          [x + w, y + h],
        ],
        [
          [x + w, y + h],
          [x, y + h],
        ],
        [
          [x, y + h],
          [x, y],
        ]
      );
      _pts.push([state._getPos(x, y), state._getPos(x + w, y)]);
      _pts.push([state._getPos(x + w, y), state._getPos(x + w, y + h)]);
      _pts.push([state._getPos(x + w, y + h), state._getPos(x, y + h)]);
      _pts.push([state._getPos(x, y + h), state._getPos(x, y)]);
    });
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
