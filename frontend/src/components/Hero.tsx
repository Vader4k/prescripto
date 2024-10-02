import { assets } from "../assets/assets_frontend/assets";

const Hero: React.FC = () => {
  return (
    <section className=" h-[70vh] sm:h-[80vh] bg-primary relative rounded-lg flex w-full gap-8">
      <div className="flex flex-col items-start gap-5 p-10 sm:gap-3 lg:p-20 xl:p-40">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-white max-w-[500px] md:leading-[4rem]">
          Book Appointment With Trusted Doctors
        </h1>
        <img src={assets.group_profiles} alt="" />
        <p className="text-white max-w-[500px] hidden sm:block">Simply browse through our extensive list of trusted doctors and schedule an appointment hassle-free.</p>
        <a
          href="#speciality"
          className="flex items-center gap-2 px-6 py-4 rounded-full bg-secondary w-fit"
        >
          <span className="font-medium text-gray-600">Book Appointment</span>
          <img src={assets.arrow_icon} alt="arrow_right" />
        </a>
      </div>
      <div className="absolute bottom-0 md:right-24">
        <img
          className="max-w-[600px] w-full px-6"
          src={assets.header_img}
          alt="hero_image"
        />
      </div>
    </section>
  );
};

export default Hero;
