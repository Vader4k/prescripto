import { UseFormRegister, FieldError } from 'react-hook-form';
import { IDoctorSchema } from '../pages/Admin/AddDoctor';
interface ITextInputProps {
    label: string;
    id: "email" | "image" | "password" | "name" | "experience" | "fees" | "speciality" | "education" | "address" | "about" | "address.addressLine1" | "address.addressLine2";
    placeholder: string;
    register: UseFormRegister<IDoctorSchema>;
    required?: boolean;
    type?: string;
    errors?: FieldError | undefined;
}

export const TextInput: React.FC<ITextInputProps> = ({
    label,
    id,
    placeholder,
    register,
    required,
    type,
    errors,
}) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                required={required}
                {...register(id)}
                 className="w-full p-2 border outline-none"
            />
            {errors && <p className="text-sm text-red-500">{errors.message}</p>}
        </div>
    );
};
