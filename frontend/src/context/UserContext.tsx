import { createContext } from "react";
import { doctors } from "../assets/assets_frontend/assets";

export interface IDoctor {
  _id: string;
  name: string;
  image: string;
  speciality: string;
  degree: string;
  experience: string;
  about: string;
  fees: number;
  address: {
    line1: string;
    line2: string;
  };
}

interface UserContextType {
  doctors: IDoctor[];
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const value = { doctors };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
