import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  return (
    <section className="px:4 md:px-10">
      <h1 className="text-center">
        ABOUT <span className="font-bold">US</span>
      </h1>
      <div className="flex items-start gap-10 py-10">
        <img className="w-full max-w-[360px]" src={assets.about_image} alt="about_section_image" />
        <div className="flex flex-col gap-6">
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently, at prescripto, we
            understand the challanges individuals face when it comes to
            scheduling doctors appointment and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology, we
            continually strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether your first appointment or managing ongoing care,
            prescripto is here to support you every step of the way.
          </p>
          <h2 className="py-6 font-medium">Our Vision</h2>
          <p>Our vision at prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, Making it easier for you to access the healthcare you need, when you need it.</p>
        </div>
      </div>
      <div className="my-10">
        <h1>WHY <span className="font-bold">CHOOSE US</span></h1>
        <div className="flex items-start justify-between my-10">
          <div className="w-1/3 p-20 border max-h-[250px]">
            <h2 className="text-xl font-medium uppercase">Effifiency:</h2>
            <p className="mt-5 text-sm leading-6">Streamlined Appointment scheduling that fits into your busy lifestyle</p>
          </div>
          <div className="w-1/3 p-20 border max-h-[250px]">
            <h2 className="text-xl font-medium uppercase">Convenience:</h2>
            <p className="mt-5 text-sm leading-6">Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className="w-1/3 p-20 border max-h-[250px]">
            <h2 className="text-xl font-medium uppercase">personalization:</h2>
            <p className="mt-5 text-sm">Tailored recommendations and reminders to help you stay on top of your health</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
