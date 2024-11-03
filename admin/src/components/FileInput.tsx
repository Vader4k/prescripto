import { UseFormRegister, FieldError } from 'react-hook-form';
import { IDoctorSchema } from '../pages/Admin/AddDoctor';
import { useState } from 'react';

interface IFileInputProps {
    label: string;
    id: "image" | "name" | "email" | "password" | "experience" | "fees" | "speciality" | "degree" | "address" | "about" | "address.addressLine1" | "address.addressLine2";
    register: UseFormRegister<IDoctorSchema>;
    required?: boolean;
    errors?: FieldError;
    img: string;
}

const FileInput: React.FC<IFileInputProps> = ({ label, id, register, errors, img, required }) => {

    const [docImage, setDocImage] = useState<string | null>(null);

    return (
      <div className="flex gap-3 items-center mb-8 text-gray-800">
        <label htmlFor={id}>
          <img
            className="w-16 bg-gray-100 rounded-full cursor-pointer"
            src={docImage ? URL.createObjectURL(docImage as unknown as Blob) : img}
            alt="upload"
          />
        </label>
        <input
          type="file"
          id={id}
          required={required}
          hidden
          accept="image/*"
          {...register(id, {
            onChange: (e) => {
              const file = e.target.files[0];
              if (file) {
                setDocImage(file);
              }
            },
          })}
        />
        <p>{label}</p>
        {errors && <p className="text-sm text-red-500">{errors.message}</p>}
      </div>
    );
  };

export default FileInput;
