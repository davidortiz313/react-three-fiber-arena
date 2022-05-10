import React, { Suspense, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh, MeshStandardMaterial, sRGBEncoding, TextureLoader } from "three";

export const CardModel: React.FC = () => {
    const modelRef = useRef();
    const gltf = useLoader(GLTFLoader, "./assets/glTF/test.glb");

    const [frontMap, backMap, frontTopMap, backTopMap] = useLoader(
        TextureLoader,
        [
            "./assets/front.jpg",
            "./assets/back.jpg",
            "./assets/frontTop.png",
            "./assets/backTop.png",
        ]
    );
    frontMap.encoding = sRGBEncoding;
    backMap.encoding = sRGBEncoding;
    frontTopMap.encoding = sRGBEncoding;
    backTopMap.encoding = sRGBEncoding;

    useFrame((_, delta) => {
        if (!modelRef.current) return;
        const model = modelRef.current as Mesh;
        model.rotation.y += delta / 2;
    });

    const model = useMemo(() => {
        gltf.scene.traverse((child) => {
            if (child instanceof Mesh) {
                const mat = child.material as MeshStandardMaterial;
                mat.roughness = 0.01;
                mat.opacity = 0.2;
            }
        });
        return gltf.scene;
    }, [gltf]);

    return (
        <Suspense fallback={null}>
            <group>
                <primitive ref={modelRef} object={model} scale={0.1}>
                    <mesh name="Front Image" position={[0, -1.2, 0.01]}>
                        <planeGeometry args={[6.2, 8.9]} />
                        <meshStandardMaterial
                            map={frontMap}
                            roughness={0.3}
                            metalness={0.7}
                        />
                    </mesh>

                    <mesh
                        name="Back Image"
                        position={[0, -1.2, -0.01]}
                        rotation-y={-Math.PI}
                    >
                        <planeGeometry args={[6.2, 8.9]} />
                        <meshStandardMaterial
                            map={backMap}
                            roughness={0.3}
                            metalness={0.7}
                        />
                    </mesh>

                    <mesh name="Front Top" position={[0, 4.85, 0.1]}>
                        <planeGeometry args={[6.7, 1.9]} />
                        <meshStandardMaterial
                            map={frontTopMap}
                            transparent={true}
                            roughness={0.3}
                            metalness={0.7}
                        />
                    </mesh>

                    <mesh
                        name="Back Top"
                        position={[0, 4.85, -0.1]}
                        rotation-y={-Math.PI}
                    >
                        <planeGeometry args={[6.7, 1.9]} />
                        <meshStandardMaterial
                            map={backTopMap}
                            transparent={true}
                            roughness={0.3}
                            metalness={0.7}
                        />
                    </mesh>
                </primitive>
            </group>
        </Suspense>
    );
};
