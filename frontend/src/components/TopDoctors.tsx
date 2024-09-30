
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../hooks/useUserContext"

const TopDoctors: React.FC = () => {
    const {doctors} = useUserContext()
    const navigate = useNavigate()
  return (
    <section className="flex flex-col items-center gap-5 px-6 text-gray-800 md:px-10">
        <h1>Top Doctors</h1>
        <p>Simply browse through our extensive list of trusted doctors.</p>
        <div className="grid w-full gap-4 px-3 pt-5 grid-cols-auto gap-y-6 sm:px-0">
            {doctors.slice(0,10).map((doctor) => (
                <button onClick={() => navigate(`/book-appointment/${doctor._id}`)} className="border border-blue-200 rounded-xl overflow-clip cursor-pointer hover:translate-y-[-10px] transition-all duration-300" key={doctor._id}>
                    <img className="bg-blue-50" src={doctor.image} alt={doctor.name} />
                    <div className="p-4">
                        <div className="flex items-center gap-2 text-sm text-center text-green-500">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <p>Available</p>
                        </div>
                        <p className="text-lg font-medium text-gray-900">{doctor.name}</p>
                        <p className="text-sm text-gray-500">{doctor.speciality}</p>
                    </div>
                </button>
            ))}
        </div>
        <button onClick={() => navigate('/doctors')} className="px-12 py-3 mt-10 text-gray-600 rounded-full bg-blue-50">More</button>
    </section>
  )
}

export default TopDoctors
