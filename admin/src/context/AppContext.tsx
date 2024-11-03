import { createContext, useMemo } from "react";

type AppContextType = {
  calculateAge: (dob: string) => number;
}

export const AppContext = createContext<AppContextType>({
  calculateAge: () => 0
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

  const calculateAge = (dob: string) => {
    const today = new Date()
    const birthDate = new Date(dob)

    const age = today.getFullYear() - birthDate.getFullYear()
    return age
  }

  const value =  useMemo(() => ({
    calculateAge
  }), [calculateAge])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
