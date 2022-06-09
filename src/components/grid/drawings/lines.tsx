import React, { useEffect, useRef } from "react";
import { extend, MeshProps, useFrame } from "@react-three/fiber";
import { Mesh, ShaderMaterial, Vector3 } from "three";
import { CurveGeometry } from "./CurveGeometry";
extend({ CurveGeometry });

interface Props extends MeshProps {
  thickness?: number;
  pts: Vector3[];
}

const vs = `
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPosition;
void main(){
    gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
    vNormal=normalize(normalMatrix*normal);
    vUv=uv;
    vPosition = position;
}`;

const fs = `
uniform float uTime;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPosition;

mat3 getRotZMat(float a){return mat3(cos(a),-sin(a),0.,sin(a),cos(a),0.,0.,0.,1.);}

float dstepf = 0.0;

float map(vec3 p)
{
	p.x += sin(p.z*1.8);
    p.y += cos(p.z*.2) * sin(p.x*.8);
	p *= getRotZMat(p.z*0.8+sin(p.x)+cos(p.y));
    p.xy = mod(p.xy, 0.3) - 0.15;
	dstepf += 0.003;
	return length(p.xy);
}

void main(){
    vec2 uv = vUv;//(fragCoord - iResolution.xy*.5 )/iResolution.y;
    vec3 rd = normalize(vec3(uv, (1.-dot(uv, uv)*.5)*.5)); 
    vec3 ro = vec3(0, 0, uTime*1.26), col = vec3(0), sp;
	float cs = cos( uTime*0.175 ), si = sin( uTime*0.175 );    
    rd.xz = mat2(cs, si,-si, cs)*rd.xz;
	float t=0.06, layers=0., d=0., aD;
    float thD = 0.02;
	for(float i=0.; i<2000.; i++)	
	{
        if(layers>15. || col.x > 1. || t>5.6) break;
        sp = ro + rd*t;
        d = map(sp); 
        aD = (thD-abs(d)*15./16.)/thD;
        if(aD>0.) 
		{ 
            col += aD*aD*(3.-2.*aD)/(1. + t*0.25)*.2; 
            layers++; 
		}
        t += max(d*.7, thD*1.5) * dstepf; 
	}
    col = max(col, 0.);
    col = mix(col, vec3(min(col.x*1.5, 1.), pow(col.x, 6.5), pow(col.x, 12.)), 
              dot(sin(rd.yxz*8. + sin(rd.zxy*8.)), vec3(.1666))+0.4);
    col = mix(col, vec3(col.x*col.x*.85, col.x, col.x*col.x*0.3),  
             dot(sin(rd.yzx*4. + sin(rd.zxy*4.)), vec3(.1666))+0.25);
    gl_FragColor = vec4( clamp(col, 0.2, 1.), 1.0 );

}`;

const _fs = `
uniform float uTime;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPosition;
void main(){
    vec3 color = vec3(vNormal.x + tan(vUv.y * uTime), vUv.x, sin(1. + 2. * uTime));
    gl_FragColor = vec4(color, 1.);
}
`;

export const Lines: React.FC<Props> = ({ thickness = 0.005, pts }) => {
  const mesh = useRef<Mesh>(null);
  const uniforms = {
    uTime: { value: 0 },
  };
  useEffect(() => {
    if (!mesh.current) return;
    mesh.current.material = new ShaderMaterial({
      uniforms,
      vertexShader: vs,
      fragmentShader: fs,
    });
  }, []);
  useFrame((_, delta) => {
    if (!mesh.current) return;
    (mesh.current.material as any).uniforms.uTime.value += delta / 30;
  });
  return (
    <group>
      <mesh ref={mesh}>
        <curveGeometry args={[thickness, pts]} />
      </mesh>
    </group>
  );
};
