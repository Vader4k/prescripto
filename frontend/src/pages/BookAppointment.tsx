import { useParams } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { useMemo, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from '../components/RelatedDoctors';

interface IDoctorInformation {
  _id: string;
  name: string;
  image: string;
  speciality: string;
  degree: string;
  experience: string;
  about: string;
  fees: number;
  address: {
    line1: string;
    line2: string;
  };
}

const BookAppointment: React.FC = () => {
  const { doctors } = useUserContext();
  const { id } = useParams();
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const docInfo: IDoctorInformation = useMemo(
    () =>
      doctors.find((doc) => doc._id === String(id)) ??
      ({} as IDoctorInformation),
    [doctors, id]
  );

  const handleSlotBooking = () => {
    console.log(selectedDay, selectedTime);
  };

  const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const timeSlot = ["8:00am", "10:00am", "12:00pm", "2:00pm", "4:00pm", "6:00pm"];

  const getDatesOfWeek = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        date: date.getDate(),
        day: daysOfTheWeek[date.getDay()]
      });
    }
    return dates;
  };

  const weekDays = getDatesOfWeek();

  return (
    <section>
      <div className="flex items-start gap-6">
        <div className="rounded-lg bg-primary">
          <img
            className="h-[280px] w-[300px]"
            src={docInfo.image}
            alt={docInfo.name + "image"}
          />
        </div>
        <div className="w-full">
          <div className="w-full h-[280px] p-6 border rounded-lg ">
            <div className="flex items-center gap-3">
              <h1 className="font-medium">{docInfo.name}</h1>
              <img src={assets.verified_icon} alt="verified_logo" />
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span>{docInfo.degree}</span> -<span>{docInfo.speciality}</span>
              <span className="px-4 py-1 text-sm border rounded-[50px]">
                {docInfo.experience}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>About</span>
              <img src={assets.info_icon} alt="info_icon" />
            </div>
            <p className="py-3 text-sm leading-6 text-gray-700">
              {docInfo.about}
            </p>
            <div>
              Appointment fee:{" "}
              <span className="font-bold">${docInfo.fees}</span>
            </div>
          </div>
          <div className="mt-5">
            <h2 className="py-4 font-medium">Booking slots</h2>
            <div className="flex items-start gap-5">
              {weekDays.map((dayInfo, index) => (
                <button
                  onClick={() => {
                    setSelectedDay(dayInfo.day);
                  }}
                  className={`flex flex-col items-center gap-4 p-4 rounded-[50px] border hover:bg-primary/50 hover:text-white transition-all ${selectedDay === dayInfo.day ? 'bg-primary text-white': 'bg-white'}`}
                  key={index}
                >
                  <span className="font-medium uppercase">{dayInfo.day}</span>
                  <span className="text-sm">{dayInfo.date}</span>
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-start gap-5 my-5">
              {timeSlot.map((time) => (
                <button
                  onClick={() => setSelectedTime(time)}
                  className={`${selectedTime === time ? 'bg-primary text-white' : 'bg-white'} px-4 py-2 border rounded-[50px] text-sm`}
                  key={time}
                >
                  {time}
                </button>
              ))}
            </div>
            <button
              onClick={handleSlotBooking}
              className="px-8 py-3 text-sm text-white bg-primary rounded-[50px] my-5"
            >
              Book an appointment
            </button>
          </div>
        </div>
      </div>
      <div>
        <RelatedDoctors id={docInfo._id} speciality={docInfo.speciality}/>
      </div>
    </section>
  );
};

export default BookAppointment;
