import { createContext } from "react";

type ColorMode = "light" | "dark";

export type ColorModeContextType = {
  mode: ColorMode;
  toggleColorMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType | undefined>(
  undefined
);
