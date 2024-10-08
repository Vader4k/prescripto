import DoctorCard from "../../components/DoctorCard";
import { useAdminContext } from "../../hooks/useAllContext";

const DoctorsList: React.FC = () => {
  const { doctors } = useAdminContext();

  return (
    <section className="m-5">
      <h1 className="text-2xl font-medium">All Doctors</h1>
      <ul className="flex flex-wrap items-start gap-6 mt-5">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor._id}
            image={doctor.image}
            _id={doctor._id}
            name={doctor.name}
            speciality={doctor.speciality}
            availability={doctor.availability}
          />
        ))}
      </ul>
    </section>
  );
};

export default DoctorsList;
