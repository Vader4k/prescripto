import { assets } from "../assets/assets_frontend/assets";

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col h-full px-6 bg-primary md:flex-row md:px-10 lg:px-20 rounded-2xl">
      <div className=" w-1/2 flex flex-col items-start justify-center gap-8 py-10 m-auto md:py-[10vw] md:mb-[-30px] text-gray-800">
        <h1 className="text-3xl font-bold text-white capitalize md:text-4xl lg:text-6xl">Book Appointment <br />With Trusted Doctors</h1>
        <div className="flex items-center gap-3">
            <img src={assets.group_profiles} alt="group_profiles" />
            <p className="text-white max-w-[500px] hidden sm:block">Simply browse through our extensive list of trusted doctors and schedule an appointment hassle-free.</p>
        </div>
        <a href="#speciality" className="flex items-center gap-2 px-6 py-4 rounded-full bg-secondary w-fit">
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
