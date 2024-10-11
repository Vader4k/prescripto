import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "../hooks/useUserContext";
import { UpdateUserInfoSchema } from "../utils/Validator";
import axios from "axios";
import { toast } from "react-toastify";

interface IFormData {
  name?: string;
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
  const { userData, token, baseUrl, getUserData } = useUserContext();
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const userEmail = userData.email; // static for now

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(UpdateUserInfoSchema),
  });

  const onSubmit = async (data: IFormData) => {
    try {
      console.log("Form Data:", data); // Log the incoming data

      const formData = new FormData();

      formData.append("name", data.name || "");
      formData.append("phone", data.phone || "");
      formData.append("gender", data.gender === "Male" ? "Male" : "Female");
      formData.append("dob", data.dob || "");
      formData.append(
        "address",
        JSON.stringify({
          line1: data.address?.line1,
          line2: data.address?.line2,
        })
      );

      if (data.image) {
        formData.append("image", data.image);
      }

      const res = await axios.post(`${baseUrl}/api/user/update-profile`, data, {
        headers: { token },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setIsEdit(false)
        getUserData()
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An unexpected error occured");
      }
    }
  };

  return (
    userData && (
      <div className="flex flex-col max-w-lg gap-2 text-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {isEdit ? (
            <div>
              <label htmlFor="image">
                <img
                  className="max-w-52"
                  src={
                    profilePic
                      ? URL.createObjectURL(profilePic as unknown as Blob)
                      : userData.image
                  }
                  alt="upload"
                />
              </label>
              <input
                type="file"
                id="image"
                hidden
                accept="image/*"
                {...register("image", {
                  onChange: (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setProfilePic(file);
                    }
                  },
                })}
              />
              {errors && (
                <p className="text-sm text-red-500">{errors.image?.message}</p>
              )}
            </div>
          ) : (
            <div>
              <img
                className="max-w-52"
                src={userData.image}
                alt={userData.name + "profile picture"}
              />
            </div>
          )}
          {isEdit ? (
            <>
              <input
                {...register("name")}
                className="px-4 py-1 my-4 font-medium bg-gray-100 border outline-none max-w-60"
                type="text"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </>
          ) : (
            <p className="my-4 text-2xl font-medium capitalize">
              {userData.name}
            </p>
          )}

          <hr className="h-1 bg-zinc-500" />

          <div>
            <p className="mt-3 font-medium underline text-neutral-500">
              CONTACT INFORMATION
            </p>
            <div className="flex flex-col gap-3 mt-4 text-neutral-700">
              <div className="flex gap-8">
                <p className="font-medium">Email id:</p>
                <p className="text-blue-500 capitalize">{userEmail}</p>{" "}
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
                <p className={`font-medium ${isEdit ? "mt-4" : ""}`}>
                  Address:
                </p>
                {isEdit ? (
                  <div className="grid mt-4">
                    <input
                      {...register("address.line1")}
                      className="px-4 py-1 font-medium bg-gray-100 border outline-none max-w-60"
                      type="text"
                    />
                    {errors.address?.line1 && (
                      <p className="text-red-500 capitalize">
                        {errors.address.line1.message}
                      </p>
                    )}
                    <input
                      {...register("address.line2")}
                      className="px-4 py-1 my-4 font-medium bg-gray-100 border outline-none max-w-60"
                      type="text"
                    />
                    {errors.address?.line2 && (
                      <p className="text-red-500 capitalize">
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
                  <p className="text-blue-500 capitalize">{userData.gender}</p>
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
                <p className="text-blue-500 capitalize">{userData.dob}</p>
              )}
            </div>
          </div>

          <div className="mt-10">
            {isEdit ? (
              <button
                className="px-8 py-3 transition-all border rounded-full border-primary hover:bg-primary hover:text-white"
                type="submit" // This is fine for the Save button
              >
                Save information
              </button>
            ) : (
              <div
                className="px-8 py-3 transition-all border rounded-full w-fit border-primary hover:bg-primary hover:text-white"
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                Edit
              </div>
            )}
          </div>
        </form>
      </div>
    )
  );
};

export default Profile;
