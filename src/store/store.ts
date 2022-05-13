import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import create from "zustand";
import { Group } from "three";

interface SceneState {
    playing: boolean;
    rotating: boolean;
    idle: boolean;
    controls?: OrbitControls;
    model?: Group;
    setPlaying: (s: boolean) => void;
    setRotating: (s: boolean) => void;
    setIdle: (s: boolean) => void;
    setControls: (s: OrbitControls) => void;
    setModel: (model: Group) => void;
}

const useStore = create<SceneState>((set, get) => ({
    playing: true,
    rotating: false,
    idle: false,
    setIdle: (idle: boolean) => {
        set((state) => ({ ...state, idle }));
    },
    setPlaying: (playing: boolean) => {
        set((state) => ({ ...state, playing }));
    },
    setRotating: (rotating: boolean) => {
        set((state) => ({ ...state, rotating }));
    },
    setControls: (controls: OrbitControls) => {
        set((state) => ({ ...state, controls }));
    },
    setModel: (model: Group) => {
        set((state) => ({ ...state, model }));
    },
}));

export default useStore;
