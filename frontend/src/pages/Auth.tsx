import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistrationSchema, LoginSchema } from "../utils/Validator";

interface FormData {
  fullname?: string;
  email: string;
  password: string;
}

const Auth: React.FC = () => {
  const [formType, setFormType] = useState<string>("register");

  // choose the appropriate schema based on form type
  const schema = formType === "register" ? RegistrationSchema : LoginSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    if (formType === "register") {
      console.log("register form data", data);
    } else {
      console.log("login form data", data);
    }
  };

  return (
    <section>
      <div className="flex flex-col gap-4 max-w-[500px] mx-auto border p-10 my-10 rounded-2xl shadow-md">
        <h1 className="font-medium">
          {formType === "register" ? "Create Account" : "Login"}
        </h1>
        <p>
          Please {formType === "register" ? "sign up" : "login"} to book
          appointment
        </p>
        <form
          className="flex flex-col items-start gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          {formType === "register" && (
            <div className="flex flex-col w-full gap-3">
              <label className="text-sm text-gray-600" htmlFor="fullname">
                Full Name
              </label>
              <input
                className="p-2 border outline-none"
                placeholder=""
                type="text"
                id="fullname"
                required
                {...register("fullname")}
              />
              {errors.fullname && (
                <p className="text-sm text-red-500">
                  {errors.fullname.message}
                </p>
              )}
            </div>
          )}
          <div className="flex flex-col w-full gap-3">
            <label className="text-sm text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              className="p-2 border outline-none"
              placeholder="...@gmail.com"
              type="email"
              id="email"
              required
              {...register("email")}
            />
            {errors.fullname && (
              <p className="text-sm text-red-500">{errors.email?.message}</p>
            )}
          </div>
          <div className="flex flex-col w-full gap-3">
            <label className="text-sm text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              className="p-2 border outline-none"
              type="password"
              id="password"
              required
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            className="w-full p-3 my-3 font-medium text-white rounded-lg bg-primary"
            type="submit"
          >
            {formType === "register" ? "Create account" : "Login"}
          </button>
          {formType === "register" ? (
            <span className="mt-2 text-sm text-center">
              Already have an account?{" "}
              <button className="underline text-primary" onClick={() => setFormType("login")}>Login here</button>
            </span>
          ) : (
            <span className="text-sm text-center ">
              Don't have an account?{" "}
              <button className="underline text-primary" onClick={() => setFormType("register")}>register</button>
            </span>
          )}
        </form>
      </div>
    </section>
  );
};

export default Auth;
