import { createContext, useState } from "react";

export const AdminContext = createContext<{
  aToken: string | null;
  setAToken: React.Dispatch<React.SetStateAction<string>>;
  baseUrl: string;
}>({
  aToken: null,
  setAToken: () => {},
  baseUrl: "",
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [aToken, setAToken] = useState<string>(localStorage.getItem("aToken") || "");
  const baseUrl = import.meta.env.VITE_API_URL;

  const value = { aToken, setAToken, baseUrl };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
    