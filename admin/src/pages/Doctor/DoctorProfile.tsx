import { useDoctorContext } from "../../hooks/useAllContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDoctorProfileSchema } from "../../validators/formValidtor";
import Loader from "../../components/Loader";

interface IFormData {
  fees: number;
  availability: boolean;
  address: {
    line1: string;
    line2: string;
  };
}

const DoctorProfile: React.FC = () => {
  const { getProfile, profileData, dToken, baseUrl } = useDoctorContext();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dToken) {
      getProfile();
    }
  }, [dToken, getProfile]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(updateDoctorProfileSchema),
  });

  const onSubmit = async (data: IFormData) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${baseUrl}/api/doctor/update-profile`,
        {
          fees: data.fees,
          availability: data.availability,
          address: {
            line1: data.address.line1,
            line2: data.address.line2,
          },
        },
        {
          headers: { dToken, "Content-Type": "application/json" },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getProfile();
        setIsEdit(false);
        setLoading(false);
      } else {
        toast.error(res.data.message);
        console.log(data);
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("something went wrong");
      }
    }
  };

  //watch the availability field
  const availability = watch("availability", profileData.availability);

  const toggleAvailability = () => {
    setValue("availability", !availability);
  };

  useEffect(() => {
    if (profileData) {
      setValue("fees", profileData.fees || 0);
      setValue("availability", profileData.availability || false);
      setValue("address.line1", profileData.address?.line1 || "");
      setValue("address.line2", profileData.address?.line2 || "");
    }
  }, [profileData, setValue]);

  return (
    profileData && (
      <div className="w-full">
        <div className="flex flex-col gap-4 m-5 max-w-6xl">
          <div>
            <img
              className="w-full rounded-lg bg-primary/80 sm:max-w-64"
              src={profileData.image}
              alt={profileData.name + "_image"}
            />
          </div>
          <div className="flex-1 p-8 py-7 bg-white rounded-lg border border-stone-100">
            {/* information */}
            <p className="text-2xl font-medium text-gray-600">
              {profileData.name}
            </p>
            <div className="flex gap-2 items-center mt-1 text-gray-600">
              <p className="capitalize">
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {profileData.experience}
              </button>
            </div>
            {/* About doctor */}
            <div>
              <h2 className="mt-5 text-sm font-medium text-gray-600">About:</h2>
              <p className="text-sm text-gray-600 max-w-[700px] my-3">
                {profileData.about}
              </p>
            </div>
            <p className="mt-4 font-medium text-gray-600">
              Appointment fee:{" "}
              <span className="text-gray-800">
                $
                {!isEdit ? (
                  profileData.fees
                ) : (
                  <input
                    placeholder="Enter fees"
                    className="px-3 py-1 border outline-none"
                    type="number"
                    {...register("fees", {
                      valueAsNumber: true, // This ensures the input is treated as a number
                      setValueAs: (value) =>
                        value === "" ? 0 : parseFloat(value), // Handle empty input or invalid number
                    })}
                  />
                )}
              </span>
              {errors.fees && (
                <p className="my-2 text-sm text-red-500">
                  {errors.fees.message}
                </p>
              )}
            </p>
            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <div className="text-sm capitalize">
                {!isEdit ? (
                  profileData.address?.line1
                ) : (
                  <input
                    type="text"
                    placeholder="Enter address one"
                    className="px-3 py-1 border outline-none"
                    {...register("address.line1")}
                  />
                )}
                <br />
                {!isEdit ? (
                  profileData.address?.line2
                ) : (
                  <input
                    type="text"
                    placeholder="Enter address two"
                    className="px-3 py-1 border outline-none"
                    {...register("address.line2")}
                  />
                )}
              </div>
            </div>
            <div className="flex gap-1 pt-2">
              <input
                checked={availability}
                disabled={!isEdit}
                type="checkbox"
                id="checkbox"
                className="w-4 h-4"
                onChange={toggleAvailability}
              />
              <label htmlFor="checkbox">Availability</label>
              {errors.availability && (
                <p className="my-2 text-sm text-red-500">
                  {errors.availability.message}
                </p>
              )}
            </div>
            {isEdit ? (
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
                type="submit"
                className="px-4 py-1 mt-5 text-sm rounded-full border transition-all border-primary hover:bg-primary hover:text-white"
              >
                Update
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEdit(true)}
                className="px-4 py-1 mt-5 text-sm rounded-full border transition-all border-primary hover:bg-primary hover:text-white"
              >
                Edit
              </button>
            )}
          </div>
        </div>
        {loading && <Loader />}
      </div>
    )
  );
};

export default DoctorProfile;
