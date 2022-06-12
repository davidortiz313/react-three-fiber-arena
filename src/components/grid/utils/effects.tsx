import { useEffect, useRef } from "react";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import { useFrame, useThree } from "@react-three/fiber";
import { Scene, ShaderMaterial, Vector2 } from "three";
// @ts-ignore
import glsl from "glslify";

const vs = glsl`
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`;

const fs = glsl`
uniform sampler2D baseTexture;
uniform sampler2D bloomTexture;
varying vec2 vUv;
void main() {
    gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
}`;

export function Effects({ children }: any) {
  const { gl, camera, size } = useThree();
  const sceneRef = useRef();
  const composerRef = useRef<EffectComposer>();

  useEffect(() => {
    const effectComposer = new EffectComposer(gl);
    const scene = sceneRef.current! as Scene;
    const renderPass = new RenderPass(scene, camera);
    const unrealBloomPass = new UnrealBloomPass(
      new Vector2(size.width, size.height),
      2.5,
      0,
      0
    );

    const fxaaPass = new ShaderPass(FXAAShader);
    const pixelRatio = gl.getPixelRatio();
    fxaaPass.material.uniforms["resolution"].value.x =
      1 / (size.width * pixelRatio);
    fxaaPass.material.uniforms["resolution"].value.y =
      1 / (size.height * pixelRatio);
    const finalPass = new ShaderPass(
      new ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: effectComposer.renderTarget2.texture },
        },
        vertexShader: vs,
        fragmentShader: fs,
        defines: {},
      }),
      "baseTexture"
    );

    effectComposer.addPass(renderPass);
    effectComposer.addPass(unrealBloomPass);
    effectComposer.addPass(fxaaPass);
    // effectComposer.addPass(finalPass);
    effectComposer.setSize(size.width, size.height);
    composerRef.current = effectComposer;
  }, [size, camera, gl]);

  useFrame(() => {
    if (composerRef.current) {
      composerRef.current.render();
    }
  }, 1);
  return <scene ref={sceneRef}>{children}</scene>;
}

export function Main({ children }: any) {
  const scene = useRef();
  const { gl, camera } = useThree();
  useFrame(() => {
    gl.autoClear = false;
    gl.clearDepth();
    gl.render(scene.current!, camera);
  }, 2);
  return <scene ref={scene}>{children}</scene>;
}
