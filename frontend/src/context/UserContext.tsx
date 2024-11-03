import { useState, useCallback, useEffect, useMemo, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export interface IDoctor {
  _id: string;
  name: string;
  image: string;
  speciality: string;
  availability: boolean;
  degree: string;
  experience: string;
  about: string;
  fees: number;
  address: {
    line1: string;
    line2: string;
  };
}

export interface IUserData {
  name: string;
  email: string;
  image: string;
  phone?: string;
  gender?: string;
  dob?: string;
  address?: {
    "line1"?: string,
    "line2"?: string
  },
  appointments?: []
}

type UserContextType = {
  doctors: IDoctor[];
  memorizedDoctors: IDoctor[];
  token: string | null; // Updated to allow null
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  baseUrl: string;
  userData: IUserData; // Changed to reflect that userData is an object, not an array
  getUserData: () => void
  getDoctors : () => void
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") ?? null
  );
  const [userData, setUserData] = useState<IUserData>({
    name: "",
    email: "",
    image: "",
    phone: "",
    gender: "", 
    dob: "", 
    address: {
      line1: "",
      line2: ""
    },
    appointments: []
  }); 

  const getDoctors = useCallback(async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/doctor/list`);
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
  }, [baseUrl]);

  useEffect(() => {
    getDoctors();
  }, [getDoctors]);

  const getUserData = useCallback(async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/user/profile`, {
        headers: {token}
      })
      if(res.data.success){
        setUserData(res.data.data)
      }else{
        return toast.error(res.data.message)
      }
    } catch (error) {
      if(axios.isAxiosError(error)){
        toast.error(error?.response?.data.message)
        setToken(null)
        localStorage.removeItem("token")
        console.log("bad token")
      }
      console.log(error)
      toast.error("something went wrong")
    }
  }, [baseUrl, token])

  useEffect(()=> {
    if(token){
      getUserData()
    }
  },[token, getUserData])
  

  const memorizedDoctors = useMemo(() => doctors, [doctors]);

  const value = useMemo(() => ({
    doctors,
    memorizedDoctors,
    token,
    setToken,
    baseUrl,
    userData: userData || null,
    getUserData,
    getDoctors
  }), [doctors, memorizedDoctors, token, setToken, baseUrl, userData, getUserData, getDoctors]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
