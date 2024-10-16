import { useDoctorContext } from "../../hooks/useAllContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDoctorProfileSchema } from "../../validators/formValidtor";

interface IFormData {
  fees: number,
  availability: boolean,
  address: {
    addressLine1: string,
    addressLine2: string
  }
}

const DoctorProfile: React.FC = () => {
  const { getProfile, profileData, dToken, baseUrl } = useDoctorContext();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    if (dToken) {
      getProfile();
    }
  }, [dToken, getProfile]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(updateDoctorProfileSchema),
  });

  const onSubmit = async (data: IFormData) => {
    console.log(data)
  }

  return (
    profileData && (
      <div>
        <div className="flex flex-col max-w-6xl gap-4 m-5">
          <div>
            <img
              className="w-full rounded-lg bg-primary/80 sm:max-w-64"
              src={profileData.image}
              alt={profileData.name + "_image"}
            />
          </div>
          <div className="flex-1 p-8 bg-white border rounded-lg border-stone-100 py-7">
            {/* information */}
            <p className="text-2xl font-medium text-gray-600">
              {profileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
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
              <span className="text-gray-800">${isEdit ? profileData.fees : <><input type="number" {...register("fees")}/></>}</span>
              {errors.fees && <p className="my-2 text-sm text-red-500">{errors.fees.message}</p>}
            </p>
            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm capitalize">
                {profileData.address?.line1} <br />
                {profileData.address?.line2}
              </p>
            </div>
            <div className="flex gap-1 pt-2">
              <input
                checked={profileData.availability}
                type="checkbox"
                id="checkbox"
                className="w-4 h-4"
                {...register("availability")}
              />
              <label htmlFor="checkbox">Availability</label>
              {errors.availability && <p className="my-2 text-sm text-red-500">{errors.availability.message}</p>}
            </div>
            {isEdit && <button
              onClick={handleSubmit(onSubmit)}
              className="px-4 py-1 mt-5 text-sm transition-all border rounded-full border-primary hover:bg-primary hover:text-white"
            >
              Update
            </button>}
            {!isEdit && <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-1 mt-5 text-sm transition-all border rounded-full border-primary hover:bg-primary hover:text-white"
            >
              Edit
            </button>}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
