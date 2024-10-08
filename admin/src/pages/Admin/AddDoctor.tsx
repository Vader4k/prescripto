import { assets } from "../../assets/assets";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoctorSchema } from "../../validators/formValidtor";
import FileInput from "../../components/FileInput";
import { TextInput } from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";
import TextArea from "../../components/TextArea";
import { useAdminContext } from "../../hooks/useAllContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import Loader from "../../components/Loader";

export interface IDoctorSchema {
  name: string;
  email: string;
  password: string;
  experience: string;
  fees: number;
  speciality: string;
  degree: string;
  address: {
    addressLine1: string;
    addressLine2: string;
  };
  about: string;
  image: string;
}

const AddDoctor: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IDoctorSchema>({
    resolver: zodResolver(addDoctorSchema),
  });

  const baseUrl = import.meta.env.VITE_API_URL;
  const {aToken} = useAdminContext()
  const [loading, setLoading] = useState(false);

  const onSubmit = async(data: IDoctorSchema) => {
    setLoading(true);
    const formData = new FormData();

    // Append all form fields to FormData
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("experience", data.experience);
    formData.append("fees", data.fees.toFixed());
    formData.append("speciality", data.speciality);
    formData.append("degree", data.degree);
    formData.append("address", JSON.stringify({line1: data.address.addressLine1, line2: data.address.addressLine2}));
    formData.append("about", data.about);
    
    // Append the image file
    if (data.image) {
      formData.append("image", data.image);
    } else {
      toast.error("Image is required");
      return;
    }
    try {
      const res = await axios.post(`${baseUrl}/api/admin/add-doctor`, formData, {
        headers: {
          // Authorization: `Bearer ${aToken}`,
          aToken,
          'Content-Type': 'multipart/form-data'
        },
      });
      console.log(res.data);
      if(res.data.success){
        toast.success(res.data.message);
        setLoading(false);
        reset();
      }else {
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full" encType="multipart/form-data">
      <div className="w-full m-5">
        <p className="mb-3 text-lg font-medium">Add Doctor</p>

        <div className="w-full max-w-4xl px-8 py-8 bg-white border rounded max-h-[80vh] h-full overflow-y-scroll">
          <FileInput
            label="Upload Doctor Image"
            id="image"
            register={register}
            errors={errors.image}
            img={assets.upload_area}
          />
          <div className="flex flex-col items-start gap-10 mb-5 text-gray-600 lg:flex-row">
            <div className="flex flex-col flex-1 gap-5">
              <TextInput
                label="Doctor Name"
                id="name"
                placeholder="Name"
                register={register}
                errors={errors.name}
                type="text"
              />
              <TextInput
                label="Doctor Email"
                id="email"
                placeholder="Email"
                register={register}
                errors={errors.email}
                type="email"
              />
              <TextInput
                label="Doctor Password"
                id="password"
                type="password"
                placeholder="Password"
                register={register}
                errors={errors.password}
              />
              <SelectInput
                label="Doctor Experience"
                id="experience"
                register={register}
                defaultValue="1 year"
                options={[
                  { value: "1 year", label: "1 year" },
                  { value: "2 years", label: "2 years" },
                  { value: "3 years", label: "3 years" },
                  { value: "4 years", label: "4 years" },
                  { value: "5 years", label: "5 years" },
                  { value: "6 years", label: "6 years" },
                  { value: "7 years", label: "7 years" },
                  // Add more options here
                ]}
                errors={errors.experience}
              />
              <TextInput
                label="Doctor Fees"
                id="fees"
                type="number"
                placeholder="Fees"
                register={register}
                errors={errors.fees}
              />
            </div>
            <div className="flex flex-col flex-1 gap-5">
              <SelectInput
                label="Speciality"
                id="speciality"
                register={register}
                defaultValue="general physician"
                options={[
                  { value: "general physician", label: "General Physician" },
                  { value: "gynecologist", label: "Gynecologist" },
                  { value: "pediatrician", label: "Pediatrician" },
                  { value: "dermatologist", label: "Dermatologist" },
                  { value: "cardiologist", label: "Cardiologist" },
                  { value: "neurologist", label: "Neurologist" },
                  { value: "urologist", label: "Urologist" },
                  { value: "ophthalmologist", label: "Ophthalmologist" },
                  { value: "psychiatrist", label: "Psychiatrist" },
                ]}
                errors={errors.speciality}
              />
              <TextInput
                label="Doctor Education"
                id="degree"
                placeholder="Education"
                register={register}
                errors={errors.degree}
              />
              <TextInput
                label="Address Line 1"
                id="address.addressLine1"
                placeholder="Address 1"
                register={register}
                errors={errors.address?.addressLine1}
              />
              <TextInput
                label="Address Line 2"
                id="address.addressLine2"
                placeholder="Address 2"
                register={register}
                errors={errors.address?.addressLine2}
              />
            </div>
          </div>

          <TextArea
            label="About Doctor"
            id="about"
            placeholder="Write about the doctor"
            register={register}
            errors={errors.about}
          />

          <button
            disabled={loading}
            type="submit"
            className="px-10 py-3 mt-4 text-white rounded-full bg-primary"
          >
            Add Doctor
          </button>
        </div>
      </div>
      {loading && <Loader />}
    </form>
  );
};

export default AddDoctor;
