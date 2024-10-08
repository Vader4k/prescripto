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
        <input
          type="file"
          id={id}
          hidden
          accept="image/*"
          {...register("image", {
            onChange: (e) => {
              const file = e.target.files?.[0];
              if (file) {
                // If you need to perform additional actions with the file,
                // such as previewing or processing before submitting,
                // you can handle them here.
                // For example:
                //setValue('image', file);
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