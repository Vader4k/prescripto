import { UseFormRegister, FieldError } from 'react-hook-form';
import { IDoctorSchema } from '../pages/Admin/AddDoctor';
interface ITextInputProps {
    label: string;
    id: "email" | "image" | "password" | "name" | "experience" | "fees" | "speciality" | "degree" | "address" | "about" | "address.addressLine1" | "address.addressLine2";
    placeholder: string;
    register: UseFormRegister<IDoctorSchema>;
    required?: boolean;
    type?: string;
    errors?: FieldError;
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
    // Determine if the input type is number
    const isNumber = type === 'number';

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                required={required}
                {...register(id, { valueAsNumber: isNumber })}
                className="p-2 w-full border outline-none"
            />
            {errors && <p className="text-sm text-red-500">{errors.message}</p>}
        </div>
    );
};
