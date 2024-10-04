import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Login: React.FC = () => {
  const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string(),
  });

  const [state, setState] = useState("Admin");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col items-center justify-center h-screen"
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
          {errors.email && <p>{errors.email.message}</p>}
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
          {errors.password && <p>{errors.password.message}</p>}
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
