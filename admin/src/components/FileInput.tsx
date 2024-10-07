import { UseFormRegister, FieldError } from 'react-hook-form';
import { IDoctorSchema } from '../pages/Admin/AddDoctor';

interface IFileInputProps {
    label: string;
    id: string;
    register: UseFormRegister<IDoctorSchema>;
    required?: boolean;
    errors?: FieldError | undefined;
    img: string;
}

const FileInput: React.FC<IFileInputProps> = ({ label, id, register, errors, img }) => {
    return (
      <div className="flex items-center gap-3 mb-8 text-gray-800">
        <label htmlFor={id}>
          <img
            className="w-16 bg-gray-100 rounded-full cursor-pointer"
            src={img}
            alt="upload"
          />
        </label>
        <input {...register("image")} type="file" id={id} hidden />
        <p>{label}</p>
        {errors && <p className="text-sm text-red-500">{errors.message}</p>}
      </div>
    );
  };
  
  export default FileInput;