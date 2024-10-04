import { createContext } from "react";

export const DoctorContext = createContext();

export const DoctorProvider = ({ children }: { children: React.ReactNode }) => {
  const value = {};

  return <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>;
};
