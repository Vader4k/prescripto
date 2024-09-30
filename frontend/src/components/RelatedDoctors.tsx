import DoctorCard from "./DoctorCard";
import { useMemo } from "react";
import { useUserContext } from "../hooks/useUserContext";

interface IRelatedDoctors {
  speciality: string;
  id: string;
}

const RelatedDoctors = ({ speciality, id }: IRelatedDoctors) => {
  const { doctors } = useUserContext();

  const relatedDoctors = useMemo(
    () =>
      doctors.filter(
        (docs) => docs.speciality === speciality && docs._id !== id
      ),
    [speciality, doctors, id]
  );

  return (
    <>
      {relatedDoctors.length > 0 && (
        <div className="my-10">
          <h1 className="my-5 font-medium text-center">Related Doctors</h1>
          <p className="text-center">
            Simply browse through our extensive list of trusted doctors
          </p>
          <div>
            <ul className="grid w-full gap-4 px-3 pt-5 mt-10 grid-cols-auto gap-y-6 sm:px-0">
              {relatedDoctors.map(({ _id, name, speciality, image }) => (
                <DoctorCard key={_id} {...{ _id, name, speciality, image }} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default RelatedDoctors;
