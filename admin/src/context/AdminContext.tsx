import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IDoctorSchema } from "../pages/Admin/AddDoctor";

export const AdminContext = createContext<{
  aToken: string | null;
  setAToken: (token: string) => void; // Updated type for setAToken
  baseUrl: string;
  doctors: IDoctorSchema[];
  changeAvailability: (docId: string) => Promise<void>; // Updated type definition
  getAllAppointments: () => void;
  appointments: []
}>({
  aToken: null,
  setAToken: () => {},
  baseUrl: "",
  doctors: [],
  changeAvailability: async () => {},
  getAllAppointments: ():void => {},
  appointments: []
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [aToken, setAToken] = useState<string>(
    localStorage.getItem("aToken") || ""
  );
  const [doctors, setDoctors] = useState<[]>([]);
  const [appointments, setAppointments] = useState<[]>([])
  const baseUrl = import.meta.env.VITE_API_URL;

  const fetchDoctors = useCallback(async () => {
    // Wrapped in useCallback
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
  }, [aToken, baseUrl]); // Added dependencies for useCallback


  const changeAvailability = async (docId: string) => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/admin/change-availability`,
        { docId },
        {
          // Wrapped docId in an object
          headers: {
            aToken,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        fetchDoctors(); // Fetch updated doctors after changing availability
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
        headers: {aToken}
      })
      if(res.data.success){
        setAppointments(res.data.data)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data.message
        )
      } else {
        console.log(error)
        toast.error("An unexpected error occured")
      }
    }
  }, [aToken, baseUrl])

  useEffect(() => {
    if (aToken) {
      fetchDoctors();
    }
  }, [aToken, fetchDoctors]);

  const value = { aToken, setAToken, baseUrl, doctors, changeAvailability, getAllAppointments, appointments };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
