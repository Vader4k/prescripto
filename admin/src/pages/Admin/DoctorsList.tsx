
import { useAdminContext } from "../../hooks/useAllContext"

const DoctorsList:React.FC = () => {

  const {aToken, doctors} = useAdminContext()

  console.log(doctors)

  return (
    <section>
      <h1>All Doctors</h1>
      <div>
        {doctors.map((doctor) => (
          <div key={doctor._id}>hi</div>
        ))}
      </div>
    </section>
  )
}

export default DoctorsList
