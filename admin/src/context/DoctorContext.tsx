import { createContext, useCallback, useEffect, useState } from "react";
import { IAppointment } from "./AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

interface IDoctorContext {
  dToken: string | null,
  setDToken : React.Dispatch<React.SetStateAction<string | null>>,
  baseUrl: string,
  appointments: IAppointment[],
}

export const DoctorContext = createContext<IDoctorContext>({
  dToken: null,
  setDToken: () => {},
  baseUrl: "",
  appointments: [],
});

export const DoctorProvider = ({ children }: { children: React.ReactNode }) => {

  const baseUrl = import.meta.env.VITE_API_URL;
  const [dToken, setDToken] = useState<string | null>(localStorage.getItem("dToken") || null);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  const getAppointments = useCallback(async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/doctor/appointments`, {
        headers:{
          dToken
        }
      })

      if(!res.data.success){
        return toast.error(res.data.message)
      } else {
        toast.success(res.data.message)
        setAppointments(res.data.data)
      }
    } catch (error) {
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data.message)
      } else {
        toast.error("Something went wrong")
      }
    }
  } ,[baseUrl, dToken])

  useEffect(()=> {
    if(dToken){
      getAppointments()
    }
  },[dToken, getAppointments])

  const value = {
    dToken,
    setDToken,
    baseUrl,
    appointments
  };

  return <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>;
};
