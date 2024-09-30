import { assets } from "../assets/assets_frontend/assets";

const Hero: React.FC = () => {
  return (
    <section className="bg-primary h-full flex flex-col md:flex-row px-6 md:px-10 lg:px-20 rounded-2xl">
      <div className=" w-1/2 flex flex-col items-start justify-center gap-8 py-10 m-auto md:py-[10vw] md:mb-[-30px] text-gray-800">
        <h1 className="text-3xl md:text-4xl lg:text-6xl text-white font-bold capitalize">Book Appointment <br />With Trusted Doctors</h1>
        <div className="flex items-center gap-3">
            <img src={assets.group_profiles} alt="group_profiles" />
            <p className="text-white max-w-[500px] hidden sm:block">Simply browse through our extensive list of trusted doctors and schedule an appointment hassle-free.</p>
        </div>
        <a href="#speciality" className="bg-secondary px-6 py-4 rounded-full w-fit flex items-center gap-2">
            <span className="font-medium text-gray-600">Book Appointment</span>
            <img src={assets.arrow_icon} alt="arrow_right" />
        </a>
      </div>
      <div className="w-1/2">
        <img className="w-full h-full" src={assets.header_img} alt="hero_image" />
      </div>
    </section>
  )
}

export default Hero
