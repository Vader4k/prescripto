import { useUserContext } from "../hooks/useUserContext";

const MyAppointment = () => {
  const { doctors } = useUserContext();

  return (
    <section>
      <h2 className="pb-3 mt-12 font-medium border-b text-zinc-700">My Appointments</h2>
      <div>
        {doctors.slice(0, 3).map((item) => (
          <div className="flex items-end justify-between py-2 border-b" key={item._id}>
            <div className="flex items-start gap-6">
              <img className="w-32 bg-indigo-50" src={item.image} alt={item.name + "image"} />
              <div>
                <p className="font-semibold text-neutral-800">{item.name}</p>
                <p className="text-[0.9rem]">{item.speciality}</p>
                <p className="mt-1 font-medium text-zinc-700">Address:</p>
                <div className="py-1 text-xs">
                  <p>{item.address.line1}</p>
                  <p>{item.address.line2}</p>
                </div>
                <div className="flex gap-2 mt-1 text-sm">
                  <span className="font-medium text-neutral-700">Date & Time:</span>
                  <span>25, July, 2024 | 8:30PM</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button type="button" className="px-8 py-2 text-sm font-medium transition-all border rounded-md hover:bg-primary hover:text-white">Pay online</button>
              <button type="button" className="px-8 py-2 text-sm font-medium transition-all border rounded-md hover:bg-red-600 hover:text-white ">Cancel appointment</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyAppointment;
