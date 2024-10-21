import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import DoctorCard from "./DoctorCard";

const TopDoctors: React.FC = () => {
  const { doctors } = useUserContext();
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center gap-5 px-6 text-gray-800 md:px-10">
      <h1>Top Doctors</h1>
      <p>Simply browse through our extensive list of trusted doctors.</p>
      <div className="grid w-full gap-4 px-3 pt-5 grid-cols-auto gap-y-6 sm:px-0">
        {doctors.slice(0, 10).map(({ _id, name, speciality, image , availability}) => (
          <DoctorCard key={_id} {...{ _id, name, speciality, image , availability}} />
        ))}
      </div>
      <button
        onClick={() => navigate("/doctors")}
        className="px-12 py-3 mt-10 text-gray-600 rounded-full bg-blue-50"
      >
        More
      </button>
    </section>
  );
};

export default TopDoctors;
