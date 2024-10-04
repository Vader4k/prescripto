import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { AppContext } from "../context/AppContext";

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within an AdminProvider");
  }
  return context;
};

export const useDoctorContext = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error("useDoctorContext must be used within a DoctorProvider");
  }
  return context;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
