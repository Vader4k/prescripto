
import { useNavigate } from "react-router-dom";

interface DoctorCardProps {
    _id: string;
    name: string;
    speciality: string;
    image: string;
    availability: boolean
  }

const DoctorCard = ({_id, name, image, speciality, availability}:DoctorCardProps) => {
    const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(`/book-appointment/${_id}`)}
      className="border border-blue-200 rounded-xl overflow-clip cursor-pointer hover:translate-y-[-10px] transition-all duration-300"
      key={_id}
    >
      <img className="bg-blue-50" src={image} alt={name} />
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-center text-green-500">
          <div className={`w-2 h-2 ${availability ? "bg-green-500" : "bg-gray-500"} rounded-full`} />
          <p>{availability ? "Available" : "Not Available"}</p>
        </div>
        <p className="font-medium text-gray-900 text-md">{name}</p>
        <p className="text-sm text-gray-500 capitalize">{speciality}</p>
      </div>
    </button>
  );
};

export default DoctorCard;
