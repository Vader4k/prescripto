import { useParams, useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { specialityData } from "../assets/assets_frontend/assets";
import { useMemo, useState } from "react";
import DoctorCard from "../components/DoctorCard";

const Doctors: React.FC = () => {
  const { speciality } = useParams();
  const { doctors } = useUserContext();
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const filteredDoctors = useMemo(
    () =>
      speciality
        ? doctors.filter((doctor) => doctor.speciality === speciality)
        : doctors,
    [doctors, speciality]
  );

  return (
    <section>
      <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-start gap-10">
        <div className="md:w-[20%] w-full">
          <h1 className="mb-4 text-sm font-medium text-gray-800">
            Browse through the doctors specialist.
          </h1>
          <button
            onClick={() => setShowFilter((prev) => !prev)}
            className={`py-1 px-3 border rounded text-sm mb-5 transition-all sm:hidden ${
              showFilter ? "bg-primary text-white" : ""
            }`}
          >
            Filter
          </button>
          {showFilter && (
            <div className="flex flex-col gap-3">
              {specialityData.map((link) => (
                <button
                  className="w-full text-sm capitalize transition-colors border cap rounded-xl hover:bg-gray-100"
                  onClick={() => navigate(`/doctors/${link.speciality}`)}
                  key={link.speciality}
                >
                  {link.speciality}
                </button>
              ))}
            </div>
          )}
          <div className="flex-col hidden gap-3 sm:flex ">
              {specialityData.map((link) => (
                <button
                  className="w-full p-3 text-sm capitalize transition-colors border rounded-xl hover:bg-gray-100"
                  onClick={() => navigate(`/doctors/${link.speciality}`)}
                  key={link.speciality}
                >
                  {link.speciality}
                </button>
              ))}
            </div>
        </div>
        <div className="w-full md:w-[80%]">
          {filteredDoctors.length > 0 ? (
            <div>
              <h2 className="mb-4 text-xl font-semibold capitalize">
                {speciality ? `${speciality} Doctors` : "All Doctors"}
              </h2>
              <ul className="grid w-full gap-4 px-3 pt-5 grid-cols-auto gap-y-6 sm:px-0">
                {filteredDoctors.map(({ _id, name, speciality, image }) => (
                  <DoctorCard key={_id} {...{ _id, name, speciality, image }} />
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-8">No doctors found for the selected specialty.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
