import { useEffect, useRef } from "react";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import { useFrame, useThree } from "@react-three/fiber";
import { Layers, MeshBasicMaterial, ShaderMaterial, Vector2 } from "three";
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

export function Effects({ meshRef, children }: any) {
  const { gl, camera, scene, size } = useThree();

  const stateRef = useRef<any>({
    darkMat: new MeshBasicMaterial({ color: "black" }),
  });
  const state = stateRef.current;

  useEffect(() => {
    state.originMat = meshRef.current.material;

    state.bloomLayer = new Layers();
    state.bloomLayer.set(1);

    state.bloomComposer = new EffectComposer(gl);
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

    state.bloomComposer.addPass(renderPass);
    state.bloomComposer.addPass(unrealBloomPass);
    state.bloomComposer.addPass(fxaaPass);

    state.materials = {};
    state.textMap = { base: null, normal: null };

    const finalPass = new ShaderPass(
      new ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: state.bloomComposer.renderTarget2.texture },
        },
        vertexShader: vs,
        fragmentShader: fs,
        defines: {},
      }),
      "baseTexture"
    );
    state.finalComposer = new EffectComposer(gl);
    state.finalComposer.addPass(renderPass);
    state.finalComposer.addPass(finalPass);

    state.bloomComposer.setSize(size.width, size.height);
  }, [scene, size, camera, gl, state, meshRef]);

  useFrame(({ clock }) => {
    const { bloomComposer, finalComposer } = state;
    if (bloomComposer && finalComposer && scene) {
      meshRef.current.material = state.darkMat;
      bloomComposer.render();

      meshRef.current.material = state.originMat;
      finalComposer.render();

      (bloomComposer.passes[1] as UnrealBloomPass).strength =
        0.1 + Math.sin(clock.getElapsedTime());
    }
  }, 1);
  return null;
}
