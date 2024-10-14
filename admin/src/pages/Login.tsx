import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validators/formValidtor";
import { useAdminContext, useDoctorContext } from "../hooks/useAllContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [state, setState] = useState("Admin");
  const { setAToken, baseUrl } = useAdminContext();
  const { setDToken } = useDoctorContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      if (state === "Admin") {
        const response = await axios.post(`${baseUrl}/api/admin/login`, data);
        if (response.status === 200) {
          toast.success(response.data.message);
          setAToken(response.data.token);
          localStorage.setItem("aToken", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${baseUrl}/api/doctor/login`, data);
        if (response.status === 200) {
          toast.success(response.data.message);
          console.log(response.data);
          setDToken(response.data.token);
          localStorage.setItem("dToken", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center h-screen p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center justify-center gap-4 m-auto min-w-[340px] w-full max-w-[500px] border rounded-lg p-8 text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {" "}
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="flex flex-col w-full gap-2">
          <label
            className="text-xs font-semibold text-gray-600"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full p-2 border rounded-md border-primary focus:outline-none"
            type="email"
            id="email"
            required
            {...register("email")}
          />
          {errors.email && (
            <p className="my-2 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col w-full gap-2">
          <label
            className="text-xs font-semibold text-gray-600"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full p-2 border rounded-md border-primary focus:outline-none"
            type="password"
            id="password"
            required
            {...register("password")}
          />
          {errors.password && (
            <p className="my-2 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          className="w-full p-2 text-white transition-all duration-300 rounded-lg bg-primary hover:bg-primary/90"
          type="submit"
        >
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <button
              type="button"
              className="text-primary"
              onClick={() => setState("Doctor")}
            >
              Click here
            </button>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <button
              type="button"
              className="text-primary"
              onClick={() => setState("Admin")}
            >
              Click here
            </button>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
