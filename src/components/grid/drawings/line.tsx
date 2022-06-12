import React, { useMemo } from "react";
import * as THREE from "three";
import { ColorRepresentation } from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { state } from "../utils/state";

interface Props {
  pt1?: number[];
  pt2?: number[];
  color?: ColorRepresentation;
}

export const Line: React.FC<Props> = ({
  pt1 = [0, 0, 0],
  pt2 = [0, 0, 1],
  color = "#0f5c05",
}) => {
  const line = useMemo(() => {
    const geo = new LineGeometry();
    const matLine = new LineMaterial({
      linewidth: 3,
      dashed: false,
    });
    matLine.color = new THREE.Color(color);
    matLine.resolution.set(state.screenSize[0], state.screenSize[1]);
    geo.setPositions([...pt1, ...pt2]);
    const _line = new Line2(geo, matLine);
    _line.computeLineDistances();
    return _line;
  }, [pt1, pt2, color]);
  return <primitive object={line} />;
};
