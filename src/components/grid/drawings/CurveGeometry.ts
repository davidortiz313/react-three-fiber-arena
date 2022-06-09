import { Object3DNode } from "@react-three/fiber";
import {
  CurvePath,
  ExtrudeGeometry,
  LineCurve3,
  Shape,
  Vector2,
  Vector3,
} from "three";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      curveGeometry: Object3DNode<CurveGeometry, typeof CurveGeometry>;
    }
  }
}

// export class CurveGeometry extends TubeGeometry {
//   constructor(thickness: number, pts: Vector3[]) {
//     const path = new CurvePath();
//     for (let i = 0; i < pts.length - 1; ++i) {
//       path.add(new LineCurve3(pts[i], pts[i + 1]));
//     }
//     // @ts-ignore
//     super(path, 1000, thickness, 4, false);
//   }
// }

export class CurveGeometry extends ExtrudeGeometry {
  constructor(thickness: number, pts: Vector3[]) {
    const x = thickness / 2;
    const shape = new Shape([
      new Vector2(-x, x),
      new Vector2(x, x),
      new Vector2(x, -x),
      new Vector2(-x, -x),
    ]);

    const path = new CurvePath();
    for (let i = 0; i < pts.length - 1; ++i) {
      path.add(new LineCurve3(pts[i], pts[i + 1]));
    }
    super(shape, {
      steps: 500,
      bevelEnabled: false,
      // @ts-ignore
      extrudePath: path,
    });
  }
}
