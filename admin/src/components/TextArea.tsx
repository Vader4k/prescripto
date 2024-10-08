import { UseFormRegister, FieldError } from 'react-hook-form';
import { IDoctorSchema } from '../pages/Admin/AddDoctor';

interface ITextAreaProps {
    label: string;
    id: "email" | "image" | "password" | "name" | "experience" | "fees" | "speciality" | "education" | "address" | "about" | "address.addressLine1" | "address.addressLine2";
    register: UseFormRegister<IDoctorSchema>;
    required?: boolean;
    errors?: FieldError | undefined;
    placeholder: string;
}

const TextArea: React.FC<ITextAreaProps> = ({ label, id, register, placeholder, required = false, errors }) => {
    return (
      <div className="flex flex-col gap-2 text-sm">
        <label htmlFor={id}>{label}</label>
        <textarea
          id={id}
          required={required}
          rows={5}
          {...register(id)}
          placeholder={placeholder}
          className="w-full p-4 border outline-none"
        />
        {errors && <p className="text-sm text-red-500">{errors.message}</p>}
      </div>
    );
  };
  
  export default TextArea;