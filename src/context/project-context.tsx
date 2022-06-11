import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import {
  GridContextProps,
  GridDataProps,
  PackAnimContextProps,
  PackAnimDataProps,
} from "./context-types";

export const GridContext = createContext<GridContextProps>({
  data: {},
  updateData: (s: GridDataProps) => {},
});
export function useGridContext() {
  return useContext(GridContext);
}

export function useGridState(): GridContextProps {
  const [data, setData] = useState<GridDataProps>({
    dataIdx: "0",
    side: "front",
    kind: "edge",
    grade: "wear",
  });
  const updateData = useCallback(
    (newItem: Partial<GridDataProps>) => {
      setData((prev) => ({ ...prev, ...newItem }));
    },
    [setData]
  );

  return {
    data,
    updateData,
  };
}

// Pack Anim
export const PackAnimContext = createContext<PackAnimContextProps>({
  data: {} as PackAnimDataProps,
  updateData: (s: Partial<PackAnimDataProps>) => {},
});
export const usePackAnimContext = () => {
  return useContext(PackAnimContext);
};
export const usePackAnimState = () => {
  const ref = useRef<any>({});
  const [data, setData] = useState<PackAnimDataProps>({
    playing: true,
    rotating: false,
    idle: false,
    state: ref.current,
  });
  const updateData = useCallback(
    (newItem: Partial<PackAnimDataProps>) => {
      setData((prev) => ({ ...prev, ...newItem }));
    },
    [setData]
  );
  return { data, updateData };
};
