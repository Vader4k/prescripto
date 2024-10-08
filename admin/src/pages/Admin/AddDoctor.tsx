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

export interface IDoctorSchema {
  name: string;
  email: string;
  password: string;
  experience: string;
  fees: number;
  speciality: string;
  education: string;
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
  } = useForm<IDoctorSchema>({
    resolver: zodResolver(addDoctorSchema),
  });

  const baseUrl = import.meta.env.VITE_API_URL;
  const {aToken} = useAdminContext()

  const onSubmit = async(data: IDoctorSchema) => {
    try {
      const res = await axios.post(`${baseUrl}/api/add-doctor`, data, {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });
      console.log(res.data);
      toast.success("Doctor added successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
          <div className="flex flex-col items-start gap-10 text-gray-600 lg:flex-row">
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
                  { value: "2 year", label: "2 year" },
                  { value: "3 year", label: "3 year" },
                  { value: "4 year", label: "4 year" },
                  { value: "5 year", label: "5 year" },
                  { value: "6 year", label: "6 year" },
                  { value: "7 year", label: "7 year" },
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
                id="education"
                placeholder="Education"
                register={register}
                errors={errors.education}
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
            type="submit"
            className="px-10 py-3 mt-4 text-white rounded-full bg-primary"
          >
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
