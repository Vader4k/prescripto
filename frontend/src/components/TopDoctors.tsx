import { doctors } from "../assets/assets_frontend/assets"
console.log(doctors)

const TopDoctors: React.FC = () => {
  return (
    <section className="flex flex-col items-center gap-5 text-gray-800 px-6 md:px-10">
        <h1>Top Doctors</h1>
        <p>Simply browse through our extensive list of trusted doctors.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
            {doctors.slice(0,10).map((doctor) => (
                <div className="border border-blue-200 rounded-xl overflow-clip cursor-pointer hover:translate-y-[-10px] transition-all duration-300" key={doctor._id}>
                    <img className="bg-blue-50" src={doctor.image} alt={doctor.name} />
                    <div className="p-4">
                        <div className="flex items-center gap-2 text-sm text-center text-green-500">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <p>Available</p>
                        </div>
                        <p>{doctor.name}</p>
                        <p>{doctor.speciality}</p>
                    </div>
                </div>
            ))}
        </div>
        <button>More</button>
    </section>
  )
}

export default TopDoctors
