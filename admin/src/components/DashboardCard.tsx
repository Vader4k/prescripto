const DashboardCard = ({
  data,
  image,
  text,
  earning
}: {
  data: number;
  image: string;
  text: string;
  earning?: boolean;
}) => {
  return (
    <div className="flex items-center gap-2 p-4 transition-all bg-white border-2 border-gray-100 rounded cursor-pointer min-w-52 hover:scale-105">
      <img className="w-14" src={image} alt={`${text}_image`} />
      <div>
        <p className="text-xl font-semibold text-gray-600">{earning ? "$" : ""}{data}</p>
        <p className="text-gray-400">{text}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
