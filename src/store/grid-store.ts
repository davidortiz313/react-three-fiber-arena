import create from "zustand";

interface SceneState {
  dataIdx: string;
  side: string;
  kind: string;
  grade: string;
  setDataIdx: (s: string) => void;
  setSide: (s: string) => void;
  setKind: (s: string) => void;
  setGrade: (s: string) => void;
}

const useGridStore = create<SceneState>((set, get) => ({
  dataIdx: "0",
  side: "front",
  kind: "edge",
  grade: "wear",
  setDataIdx: (dataIdx: string) => {
    set((state) => ({ ...state, dataIdx }));
  },
  setSide: (side: string) => {
    set((state) => ({ ...state, side }));
  },
  setKind: (kind: string) => {
    set((state) => ({ ...state, kind }));
  },
  setGrade: (grade: string) => {
    set((state) => ({ ...state, grade }));
  },
}));

export default useGridStore;
