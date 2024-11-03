import { createContext, useCallback, useState, useMemo } from "react";
import { IAppointment } from "./AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

export interface IDoctorData {
  name: string;
  image: string;
  degree: string;
  speciality: string;
  experience: string;
  about: string;
  fees: number;
  availability: boolean;
  address?: {
    line1?: string;
    line2?: string;
  };
  slots_booked?: [];
}

interface IDoctorContext {
  dToken: string | null;
  setDToken: React.Dispatch<React.SetStateAction<string | null>>;
  baseUrl: string;
  appointments: IAppointment[];
  getAppointments: () => Promise<void>;
  dashData: {
    earnings: number;
    appointments: number;
    patients: number;
    latestAppointments: IAppointment[];
  };
  getDashData: () => Promise<void>;
  getProfile: () => Promise<void>;
  profileData: IDoctorData;
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
  getProfile: async () => {},
  profileData: {
    name: "",
    experience: "",
    image: "",
    about: "",
    degree: "",
    speciality: "",
    fees: 0,
    availability: true,
    address: {
      line1: "",
      line2: "",
    },
    slots_booked: [],
  },
});

export const DoctorProvider = ({ children }: { children: React.ReactNode }) => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [dToken, setDToken] = useState<string | null>(
    localStorage.getItem("dToken") ?? null
  );
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [dashData, setDashData] = useState({
    earnings: 0,
    appointments: 0,
    patients: 0,
    latestAppointments: [],
  });
  const [profileData, setProfileData] = useState({} as IDoctorData);

  //function to get doctors appointments
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

  //function to get dashboard information
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
        setDToken(null);
        localStorage.removeItem("dToken");
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [baseUrl, dToken]);

  //api to get profileData
  const getProfile = useCallback(async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/doctor/profile`, {
        headers: {
          dToken,
        },
      });

      if (!res.data.success) {
        toast.error(res.data.message);
      }
      setProfileData(res.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
        setDToken(null);
        localStorage.removeItem("dToken");
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [baseUrl, dToken]);

  const value = useMemo(() => ({
    dToken,
    setDToken,
    baseUrl,
    appointments,
    getAppointments,
    dashData,
    getDashData,
    profileData,
    getProfile,
  }), [dToken, baseUrl, appointments, dashData, profileData, getAppointments, getDashData, getProfile]);

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};
