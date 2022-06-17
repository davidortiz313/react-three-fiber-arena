// @ts-ignore
import glsl from "glslify";

export const vertexShader = glsl`
varying vec3 vNormal;

varying vec2 vUv;

varying vec3 vPosition;

void main(){
    gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
    vNormal=normalize(normalMatrix*normal);
    vUv=uv;
    vPosition = position;
}
`;
