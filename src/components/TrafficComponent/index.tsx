export const TrafficComponent = ({
  selectedLocation,
  locations,
  trafficCamera,
}: {
  selectedLocation: string;
  locations: any;
  trafficCamera: any;
}) => {
  const loc = locations?.area_metadata?.find(
    (ele: any) => ele.name === selectedLocation
  );

  const trafficIndex = trafficCamera?.items?.[0];
  const traffic = trafficIndex && trafficIndex.cameras;

  const cameraFound = traffic?.find((t: any) =>
    t.location.latitude
      .toString()
      .includes(
        loc?.label_location?.latitude.toString() ||
          t.location.longitude
            .toString()
            .includes(loc?.label_location?.longitude.toString())
      )
  );

  return (
    cameraFound && (
      <div className="flex items-center justify-center rounded-lg border drop-shadow-md text-primary w-[18.5rem] md:h-72 md:w-[32rem] overflow-hidden">
        <img
          src={cameraFound?.image}
          alt={selectedLocation}
          className="object-cover h-auto w-auto"
        />
      </div>
    )
  );
};
