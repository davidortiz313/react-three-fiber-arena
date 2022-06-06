import create from "zustand";

interface SceneState {
    rotating: boolean;
    setRotating: (s: boolean) => void;
}

const useStore = create<SceneState>((set, get) => ({
    rotating: true,
    setRotating: (rotating: boolean) => {
        set((state) => ({ ...state, rotating }));
    },
}));

export default useStore;
