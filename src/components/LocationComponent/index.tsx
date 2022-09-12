export const LocationComponent = ({
  locations,
  onLocationChange,
}: {
  locations: any;
  onLocationChange: any;
}) => {
  return (
    <div className="p-2 rounded-lg border drop-shadow-md text-primary h-48 overflow-hidden overflow-y-auto w-96">
      <ul>
        {locations?.area_metadata?.map((d: any) => (
          <li
            key={d.name}
            onClick={() => onLocationChange[1](d.name)}
            className="p-1 hover:cursor-pointer hover:bg-gray-200 hover:font-semibold"
          >
            {d.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
