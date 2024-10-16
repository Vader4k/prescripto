import { createContext, useCallback, useState } from "react";
import { IAppointment } from "./AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

interface IDoctorContext {
  dToken: string | null;
  setDToken: React.Dispatch<React.SetStateAction<string | null>>;
  baseUrl: string;
  appointments: IAppointment[];
  getAppointments: () => Promise<void>;
  dashData: {
    earnings: number,
    appointments: number,
    patients: number,
    latestAppointments: IAppointment[],
  };
  getDashData: () => Promise<void>;
}

export const DoctorContext = createContext<IDoctorContext>({
  dToken: null,
  setDToken: () => {},
  baseUrl: "",
  appointments: [],
  getAppointments: async () => {},
  dashData: {
    earnings: 0,
    appointments: 0,
    patients: 0,
    latestAppointments: [],
  },
  getDashData: async () => {},
});

export const DoctorProvider = ({ children }: { children: React.ReactNode }) => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [dToken, setDToken] = useState<string | null>(
    localStorage.getItem("dToken") || null
  );
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [dashData, setDashData] = useState({
    earnings: 0,
    appointments: 0,
    patients: 0,
    latestAppointments: [],
  });

  const getAppointments = useCallback(async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/doctor/appointments`, {
        headers: {
          dToken,
        },
      });
      if (!res.data.success) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        setAppointments(res.data.data.reverse());
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [baseUrl, dToken]);

  const getDashData = useCallback(async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/doctor/dashboard`, {
        headers: {
          dToken,
        },
      });
      if (!res.data.success) {
        toast.error(res.data.message);
      } else {
        setDashData(res.data.dashData);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  },[baseUrl, dToken]);

  const value = {
    dToken,
    setDToken,
    baseUrl,
    appointments,
    getAppointments,
    dashData,
    getDashData,
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};
