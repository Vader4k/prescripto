import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <section id="speciality">
      <div className="container flex flex-col items-center justify-center gap-5 mx-auto">
        <h1 className="font-semibold">Find by Speciality</h1>
        <p className="max-w-[500px] text-center text-gray-600">
          Simply browse through our extensive list of trusted doctors and
          schedule an appointment hassle-free.
        </p>
        <div className="flex w-full gap-4 pt-5 overflow-x-auto sm:justify-center">
          {Object.entries(specialityData).map(([key, value]) => (
            <Link
              className="flex flex-col items-center text-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
              to={`/doctors/${value.speciality}`}
              key={key}
            >
              <div>
                <img
                  className="w-16 mb-2 sm:w-24"
                  src={value.image}
                  alt={`${value.speciality} icon`}
                />
                <h3 className="font-semibold">{value.speciality}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialityMenu;
