import { createContext } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const value = {};

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
