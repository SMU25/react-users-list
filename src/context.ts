import { createContext } from "react";

export const AppContext = createContext<(id: number) => void>(null);
