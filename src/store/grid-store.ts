import create from "zustand";

interface SceneState {
    side: string;
    kind: string;
    grade: string;
    setSide: (s: string) => void;
    setKind: (s: string) => void;
    setGrade: (s: string) => void;
    size: [number, number];
    setSize: (s: [number, number]) => void;
}

const useGridStore = create<SceneState>((set, get) => ({
    side: "front",
    kind: "wear",
    grade: "edges",
    size: [window.innerWidth, window.innerHeight],
    setSide: (side: string) => {
        set((state) => ({ ...state, side }));
    },
    setKind: (kind: string) => {
        set((state) => ({ ...state, kind }));
    },
    setGrade: (grade: string) => {
        set((state) => ({ ...state, grade }));
    },
    setSize: (size: [number, number]) => {
        set((state) => ({ ...state, size }));
    },
}));

export default useGridStore;
