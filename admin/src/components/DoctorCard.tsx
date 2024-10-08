
interface IDoctorCard {
  _id: string;
  name: string;
  speciality: string;
  image: string;
  key: string;
  availability: boolean
}

const DoctorCard = ({ name, speciality, image, availability }: IDoctorCard) => {
  return (
    <div className="w-full max-w-56 h-fit min-h-[200px] rounded-lg shadow-sm border border-indigo-200 group overflow-hidden">
      <img className="transition-all duration-500 bg-indigo-50 w-fit group-hover:bg-primary" src={image} alt={`Dr ${name} image`} />
      <div className="p-4">
        <h1 className="text-lg font-medium capitalize">{name}</h1>
        <p className="text-sm text-gray-600 capitalize">{speciality}</p>
        <div className="flex items-center gap-1 mt-2 text-sm">
          <input type="checkbox" checked={availability}/>
          <p>Available</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
