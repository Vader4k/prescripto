import { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { UpdateUserInfoSchema } from "../utils/Validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface IFormData {
  fullname?: string;
  phone?: string;
  image: string;
  gender?: "Male" | "Female";
  dob?: string;
  address?: {
    line1?: string;
    line2?: string;
  };
}

const Profile: React.FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [userData, setUserData] = useState<IFormData>({
    fullname: "Edward Vincent",
    image: assets.profile_pic,
    phone: "+234 010 599 504",
    address: {
      line1: "65 richmond, cross",
      line2: "circle church road, england",
    },
    gender: "Male",
    dob: "2000-01-20",
  });

  const userEmail = "King@gmail.com"; // static for now

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(UpdateUserInfoSchema),
    defaultValues: userData, // initial with default value
  });

  const onSubmit = (data: IFormData) => {
    setUserData((prev) => ({
      ...prev,
      ...data,
    }));
    setIsEdit(false);
    console.log(userData);
  };

  return (
    <div className="flex flex-col gap-2 max-w-lg text-sm">
      <img
        className="rounded-lg max-w-36"
        src={userData.image}
        alt={userData.fullname + "image"}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {isEdit ? (
          <>
            <input
              {...register("fullname")}
              className="px-4 py-1 my-4 font-medium bg-gray-100 border outline-none max-w-60"
              type="text"
            />
            {errors.fullname && (
              <p className="text-red-500">{errors.fullname.message}</p>
            )}
          </>
        ) : (
          <p className="my-4 text-2xl font-medium">{userData.fullname}</p>
        )}

        <hr className="h-1 bg-zinc-500" />

        <div>
          <p className="mt-3 font-medium underline text-neutral-500">
            CONTACT INFORMATION
          </p>
          <div className="flex flex-col gap-3 mt-4 text-neutral-700">
            <div className="flex gap-8">
              <p className="font-medium">Email id:</p>
              <p className="text-blue-500">{userEmail}</p>{" "}
              {/* Static or fetched email */}
            </div>
            <div className="flex gap-8">
              <p className="font-medium">Phone:</p>
              {isEdit ? (
                <>
                  <input
                    {...register("phone")}
                    className="px-4 py-1 font-medium bg-gray-100 border outline-none max-w-60"
                    type="text"
                  />
                  {errors.phone && (
                    <p className="text-red-500">{errors.phone.message}</p>
                  )}
                </>
              ) : (
                <p className="text-blue-500">{userData.phone}</p>
              )}
            </div>
            <div className="flex gap-8">
              <p className={`font-medium ${isEdit ? "mt-4" : ""}`}>Address:</p>
              {isEdit ? (
                <div className="grid mt-4">
                  <input
                    {...register("address.line1")}
                    className="px-4 py-1 font-medium bg-gray-100 border outline-none max-w-60"
                    type="text"
                  />
                  {errors.address?.line1 && (
                    <p className="text-red-500">
                      {errors.address.line1.message}
                    </p>
                  )}
                  <input
                    {...register("address.line2")}
                    className="px-4 py-1 my-4 font-medium bg-gray-100 border outline-none max-w-60"
                    type="text"
                  />
                  {errors.address?.line2 && (
                    <p className="text-red-500">
                      {errors.address.line2.message}
                    </p>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  <p>{userData.address?.line1}</p>
                  <p>{userData.address?.line2}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-4 text-neutral-700">
            <p className="mt-3 font-medium underline text-neutral-500">
              BASIC INFORMATION
            </p>
            <div className="flex gap-8">
              <p className="font-medium">Gender:</p>
              {isEdit ? (
                <>
                  <select
                    {...register("gender")}
                    className="bg-gray-300 max-w-20"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500">{errors.gender.message}</p>
                  )}
                </>
              ) : (
                <p className="text-blue-500">{userData.gender}</p>
              )}
            </div>
          </div>

          <div className="flex gap-6 mt-4">
            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <div>
                <input
                  {...register("dob")}
                  className="p-2 bg-gray-100 rounded max-w-32"
                  type="date"
                />
                {errors.dob && (
                  <p className="text-red-500">{errors.dob.message}</p>
                )}
              </div>
            ) : (
              <p className="text-blue-500">{userData.dob}</p>
            )}
          </div>
        </div>

        <div className="mt-10">
          {isEdit ? (
            <button
              className="px-8 py-3 rounded-full border transition-all border-primary hover:bg-primary hover:text-white"
              type="submit" // This is fine for the Save button
            >
              Save information
            </button>
          ) : (
            <button
              className="px-8 py-3 rounded-full border transition-all w-fit border-primary hover:bg-primary hover:text-white"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
