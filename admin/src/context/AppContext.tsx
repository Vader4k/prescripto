import { createContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const value = {};

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
