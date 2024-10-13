

const DashboardCard = ({data, image, text}: {data: number; image: string; text: string}) => {
  return (
    <div className="flex items-center gap-2 p-4 transition-all bg-white border-2 border-gray-100 rounded cursor-pointer min-w-52 hover:scale-105">
      <img src={image} alt={`${text}_image`} />
      <div>
        <p>{data}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
