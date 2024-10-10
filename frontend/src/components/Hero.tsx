import { assets } from "../assets/assets_frontend/assets";

const Hero: React.FC = () => {
  return (
    <section className=" h-[70vh] sm:h-[70vh] bg-primary relative rounded-lg flex w-full gap-8">
      <div className="px-5 py-14 sm:p-10 md:py-20 lg:p-20 xl:px-22 xl:py-44">
        <h2 className="text-2xl md:text-3xl lg:text-5xl font-semibold text-white max-w-[500px] lg:leading-[4rem]">
          Book Appointment With Trusted Doctors
        </h2>
        <div className="flex items-center gap-3 my-5">
          <img src={assets.group_profiles} alt="" />
          <p className="text-white max-w-[350px] hidden text-sm sm:block ">
            Simply browse through our extensive list of trusted doctors and
            schedule an appointment hassle-free.
          </p>
        </div>
        <a
          href="#speciality"
          className="flex items-center gap-2 px-10 py-3 rounded-full bg-secondary w-fit"
        >
          <span className="font-medium text-gray-600">Book Appointment</span>
          <img src={assets.arrow_icon} alt="arrow_right" />
        </a>
      </div>
      <div className="absolute bottom-0 md:right-6">
        <img
          className="max-w-[600px] xl:max-w-[700px] w-full px-6"
          src={assets.header_img}
          alt="hero_image"
        />
      </div>
    </section>
  );
};

export default Hero;
