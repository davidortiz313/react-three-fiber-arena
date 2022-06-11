export interface GridDataProps {
  dataIdx?: string;
  side?: string;
  kind?: string;
  grade?: string;
}

export interface GridContextProps {
  data: GridDataProps;
  updateData: (data: GridDataProps) => void;
}

export interface PackAnimDataProps {
  state: any;
  playing: boolean;
  rotating: boolean;
  idle: boolean;
}

export interface PackAnimContextProps {
  data: PackAnimDataProps;
  updateData: (data: Partial<PackAnimDataProps>) => void;
}
