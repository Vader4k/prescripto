import { assets } from "../assets/assets_frontend/assets"

const Contact = () => {
  return (
    <section>
      <h1 className="text-center uppercase">Contact <span className="font-bold">Us</span></h1>
      <div className="flex items-center justify-center gap-6 py-10">
        <img className="w-full max-w-[400px] h-[400px]" src={assets.contact_image} alt="contact page image" />
        <div className="flex flex-col items-start h-full gap-4">
          <h2 className="font-bold text-gray-600">OUR OFFICE</h2>
          <p className="text-sm">54709 Willms Station</p>
          <span className="text-sm">Suite 350, washington, USA</span>
          <p>Tel: (415) 555-0132</p>
          <p className="text-sm">Email: greatstackdev@gmail.com</p>
          <h2 className="font-bold text-gray-600">CAREERS AT PRESCRIPTO</h2>
          <p className="text-sm">Learn more about our teams and job openings</p>
          <button className="px-6 py-2 text-sm border-2">Explore jobs</button>
        </div>
      </div>
    </section>
  )
}

export default Contact
