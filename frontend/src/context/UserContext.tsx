import { createContext } from "react";
import { useState, useCallback, useEffect, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
  memorizedDoctors: IDoctor[]; // memoized version of doctors for performance optimization
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const baseurl = import.meta.env.VITE_API_URL
  const [doctors, setDoctors] = useState<IDoctor[]>([])

  const getDoctors = useCallback( async () => {
    try {
      const res = await axios.get(`${baseurl}/api/doctor/list`)
      if (res.data.success) {
        setDoctors(res.data.doctors);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("something went wrong.");
      }
    }
  },[baseurl])
  
  useEffect(() => {
    getDoctors();
  }, []);

  const memorizedDoctors = useMemo(() => doctors, [doctors])


  const value = { 
    doctors,
    memorizedDoctors
   };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
