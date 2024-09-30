import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <section id="speciality" className="py-8">
      <div className="container mx-auto flex flex-col items-center justify-center gap-5">
        <h1>Find by Speciality</h1>
        <p className="max-w-[500px] text-center text-gray-600">
          Simply browse through our extensive list of trusted doctors and
          schedule an appointment hassle-free.
        </p>
        <div className="flex gap-4 sm:justify-center pt-5 w-full overflow-x-auto">
          {Object.entries(specialityData).map(([key, value]) => (
            <Link
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex flex-col items-center text-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
              to={`/doctors/${value.speciality}`}
              key={key}
            >
              <div>
                <img
                  className="w-16 sm:w-24 mb-2"
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
