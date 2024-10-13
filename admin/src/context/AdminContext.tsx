import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IDoctorSchema } from "../pages/Admin/AddDoctor";

export interface IAppointment {
  _id: string;
  userId: string;
  docId: string;
  slotDate: string;
  slotTime: string;
  amount: number;
  cancelled: boolean;
  date: number;
  docData: {
    _id: string;
    name: string;
    email: string;
    image: string;
    speciality: string;
    fees: number;
    address: {
      line1: string;
      line2: string;
    };
  };
  userData: {
    _id: string;
    name: string;
    email: string;
    image: string;
    phone: string;
    dob: string;
  };
  isCompleted: boolean;
  payment: boolean;
}

interface IDashData {
  doctors: number,
  appointments: number,
  patients: number,
  latestAppointments: IAppointment[]
}

export const AdminContext = createContext<{
  aToken: string | null;
  setAToken: (token: string) => void;
  baseUrl: string;
  doctors: IDoctorSchema[];
  changeAvailability: (docId: string) => Promise<void>;
  getAllAppointments: () => Promise<void>; // Return type fixed to Promise<void>
  appointments: IAppointment[]; // Properly typed as IAppointment[]
  dashboardData: IDashData;
  getDashboardData : () => Promise<void>
}>({
  aToken: null,
  setAToken: () => {},
  baseUrl: "",
  doctors: [],
  changeAvailability: async () => {},
  getAllAppointments: async () => {},
  appointments: [], // Correct initial value and type
  dashboardData: {
    doctors: 0,
    appointments: 0,
    patients: 0,
    latestAppointments: [],
  },
  getDashboardData: async() => {}
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [aToken, setAToken] = useState<string>(
    localStorage.getItem("aToken") || ""
  );
  const [doctors, setDoctors] = useState<IDoctorSchema[]>([]); // Properly typed state
  const [appointments, setAppointments] = useState<IAppointment[]>([]); // Properly typed state
  const [dashboardData, setDashboardData] = useState<IDashData>({
    doctors: 0,
    appointments: 0,
    patients: 0,
    latestAppointments: [],
  })
  const baseUrl = import.meta.env.VITE_API_URL;

  const fetchDoctors = useCallback(async () => {
    try {
      const result = await axios.get(`${baseUrl}/api/admin/all-doctors`, {
        headers: {
          aToken,
        },
      });
      if (!result.data.success) {
        toast.error(result.data.message);
      }
      setDoctors(result.data.doctors);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }, [aToken, baseUrl]);

  const changeAvailability = async (docId: string) => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/admin/change-availability`,
        { docId },
        {
          headers: {
            aToken,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        fetchDoctors();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const getAllAppointments = useCallback(async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/admin/appointments`, {
        headers: { aToken },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        console.log(error);
        toast.error("An unexpected error occurred");
      }
    }
  }, [aToken, baseUrl]);

  const getDashboardData = useCallback(async() => {
    try {
      const res = await axios.get(`${baseUrl}/api/admin/dashboard`, {headers: {aToken}})
      if(res.data.success){
        setDashboardData(res.data.dashData)
      }
    } catch (error) {
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data.message)
      }else{
        toast.error("something went wrong")
      }
    }
  }, [aToken, baseUrl])

  useEffect(() => {
    if (aToken) {
      fetchDoctors();
    }
  }, [aToken, fetchDoctors]);

  const value = {
    aToken,
    setAToken,
    baseUrl,
    doctors,
    changeAvailability,
    getAllAppointments,
    appointments,
    dashboardData,
    getDashboardData
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
