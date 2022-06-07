import { useMemo } from "react";
import useGridStore from "../../../store/grid-store";
import { Line } from "./line";
import { state } from "../utils/state";

export function Surface({ pointData }: { pointData: any }) {
  const { grade, side } = useGridStore();

  const lines = useMemo(() => {
    const _lines: any[] = [];
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
    });
    return _lines;
  }, [grade, side, pointData]);
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
