import create from "zustand";

interface SceneState {
    side: string;
    pos: string;
    grade: string;
    setSide: (s: string) => void;
    setPos: (s: string) => void;
    setGrade: (s: string) => void;
    size: [number, number];
    setSize: (s: [number, number]) => void;
}

const useGridStore = create<SceneState>((set, get) => ({
    side: "front",
    pos: "Center",
    grade: "Spotting",
    size: [window.innerWidth, window.innerHeight],
    setSide: (side: string) => {
        set((state) => ({ ...state, side }));
    },
    setPos: (pos: string) => {
        set((state) => ({ ...state, pos }));
    },
    setGrade: (grade: string) => {
        set((state) => ({ ...state, grade }));
    },
    setSize: (size: [number, number]) => {
        set((state) => ({ ...state, size }));
    },
}));

export default useGridStore;
