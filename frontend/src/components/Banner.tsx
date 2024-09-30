import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

const Banner:React .FC = () => {
  const navigate = useNavigate();
  return (
    <section className="flex items-center justify-between gap-5 px-6 text-gray-800 md:px-24 bg-primary h-[350px] rounded-lg">
      <div className="w-1/2">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold lg:leading-[4rem] text-white">
          Book Appointment <br /> With 100+ Trusted Doctors
        </h1>
        <button
          onClick={() => navigate("/auth")}
          className="px-6 py-3 mt-5 text-sm text-gray-600 transition-all bg-white rounded-3xl hover:scale-105"
        >
          Create account
        </button>
      </div>
      <div className="relative hidden w-1/2 h-full md:block">
        <img
          className="absolute right-0 max-w-[400px] bottom-0"
          src={assets.appointment_img}
          alt="book_appointment_banner"
        />
      </div>
    </section>
  );
};

export default Banner;
