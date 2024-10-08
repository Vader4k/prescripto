import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IDoctorSchema } from "../pages/Admin/AddDoctor";

export const AdminContext = createContext<{
  aToken: string | null;
  setAToken: React.Dispatch<React.SetStateAction<string>>;
  baseUrl: string;
  doctors: IDoctorSchema[];
  changeAvailability: (docId: string) => Promise<void>; // Updated type definition
}>({
  aToken: null,
  setAToken: () => {},
  baseUrl: "",
  doctors: [],
  changeAvailability: async () => {}
});



export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [aToken, setAToken] = useState<string>(
    localStorage.getItem("aToken") || ""
  );
  const [doctors, setDoctors] = useState<[]>([]);
  const baseUrl = import.meta.env.VITE_API_URL;

  const fetchDoctors = useCallback(async () => { // Wrapped in useCallback
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

  useEffect(()=> {
    if(aToken){
      fetchDoctors();
    }
  },[aToken, fetchDoctors]) // Now fetchDoctors is stable and can be added here


  const changeAvailability = async (docId:string) => {
    try {
      const res = await axios.post(`${baseUrl}/api/admin/change-availability`, {docId}, {
        headers: {
          aToken,
        },
      })
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
        toast.error('An unexpected error occurred');
      }
    }
  }

  const value = { aToken, setAToken, baseUrl, doctors, changeAvailability };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
