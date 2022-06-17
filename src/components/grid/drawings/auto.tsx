import { useMemo } from "react";
import { state } from "../utils/state";
import { useGridContext } from "../../../context/project-context";
import { ShaderToy } from "../shaders/shader-toy";
import { Vector4 } from "three";

export function Auto({ pointData }: { pointData: any }) {
  const {
    data: { side },
  } = useGridContext();

  const { lines } = useMemo(() => {
    const _lines: any[] = [];
    const _pts: any[] = [];

    const { signature } = pointData;

    signature[`${side}Labels`].forEach((ele: any) => {
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
  }, [side, pointData]);
  return (
    <group>
      <ShaderToy edges={lines} />
    </group>
  );
}
