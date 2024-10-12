import { useState, useEffect, useCallback } from "react";
import { useUserContext } from "../hooks/useUserContext";
import axios from "axios";
import { toast } from "react-toastify";

interface IAppointment {
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
  };
  isCompleted: boolean;
  payment: boolean;
}

const MyAppointment = () => {
  const { baseUrl, token } = useUserContext();

  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  const getUserAppointments = useCallback(async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/user/appointments`, {
        headers: { token },
      });
      if (!res.data.success) {
        toast.error(res.data.message);
      } else {
        setAppointments(res.data.data.reverse());
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
      console.log(error);
    }
  }, [baseUrl, token]);

  const cancelAppointment = async (appId: string) => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/user/cancel-appointment`,
        { appId },
        {
          headers: {
            token,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getUserAppointments();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
      console.log(error);
    }
  };

  const payment = async (appId: string) => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/user/pay`,
        { appId },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token, getUserAppointments]);

  return (
    <section>
      <h2 className="pb-3 mt-12 font-medium border-b text-zinc-700">
        My Appointments
      </h2>
      <div>
        {appointments.map((item) => (
          <div
            className="flex flex-col justify-between gap-3 py-2 border-b md:flex-row md:items-end"
            key={item._id}
          >
            <div className="flex items-start gap-6">
              <img
                className="w-32 bg-indigo-50"
                src={item.docData.image}
                alt={item.docData.name + "image"}
              />
              <div>
                <p className="font-semibold text-neutral-800">
                  {item.docData.name}
                </p>
                <p className="text-[0.9rem]">{item.docData.speciality}</p>
                <p className="mt-1 font-medium text-zinc-700">Address:</p>
                <div className="py-1 text-xs">
                  <p>{item.docData.address.line1}</p>
                  <p>{item.docData.address.line2}</p>
                </div>
                <div className="flex gap-2 mt-1 text-sm">
                  <span className="font-medium text-neutral-700">
                    Date & Time:
                  </span>
                  <span>
                    {item.slotDate} | {item.slotTime}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {!item.cancelled && !item.payment && (
                <button
                  type="button"
                  onClick={() => payment(item._id)}
                  className="px-8 py-2 text-sm font-medium transition-all border rounded-md hover:bg-primary hover:text-white"
                >
                  Pay online
                </button>
              )}
              {!item.cancelled && item.payment && (
                <button className="px-8 py-2 text-sm font-medium transition-all border rounded-md text-primary ">
                  Paid
                </button>
              )}
              {item.cancelled && (
                <button className="px-8 py-2 text-sm font-medium text-red-500 transition-all border border-red-500 rounded-md ">
                  Appointment Cancelled
                </button>
              )}
              {!item.cancelled && !item.payment && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  type="button"
                  className="px-8 py-2 text-sm font-medium transition-all border rounded-md hover:bg-red-600 hover:text-white "
                >
                  Cancel appointment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyAppointment;
