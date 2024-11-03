import { UseFormRegister, FieldError } from 'react-hook-form';
import { IDoctorSchema } from '../pages/Admin/AddDoctor';
interface ISelectInputProps {
    label: string;
    id: "email" | "image" | "password" | "name" | "experience" | "fees" | "speciality" | "education" | "address" | "about" | "address.addressLine1" | "address.addressLine2";
    options: {value: string, label: string}[];
    register: UseFormRegister<IDoctorSchema>;
    required?: boolean;
    defaultValue?: string;
    errors?: FieldError;
}

export const SelectInput: React.FC<ISelectInputProps> = ({ label, id, register, options, required = false, defaultValue, errors }) => {
    return (
      <div className="flex flex-col gap-2 text-sm">
        <label htmlFor={id}>{label}</label>
        <select
          id={id}
          {...register("_id")}
          defaultValue={defaultValue}
          className="p-2 w-full border outline-none"
          required={required}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors && <p className="text-sm text-red-500">{errors.message}</p>}
      </div>
    );
  };
  
  export default SelectInput;
