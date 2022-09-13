export const WeatherComponent = ({
  selectedLocation,
  locations,
}: {
  selectedLocation: string;
  locations: any;
}) => {
  const weatherIndex = locations?.items?.[0];
  const weather =
    weatherIndex &&
    weatherIndex.forecasts?.find((ele: any) => ele.area === selectedLocation);

  let weatherIcon = "02d";

  switch (weather?.forecast) {
    case "Cloudy":
      weatherIcon = "04d";
      break;
    case "Light Rain":
    case "Moderate Rain":
    case "Heavy Rain":
    case "Passing Showers":
    case "Light Showers":
    case "Showers":
    case "Heavy Showers":
      weatherIcon = "10n";
      break;
    case "Thundery Showers":
    case "Heavy Thundery Showers":
      weatherIcon = "11n";
      break;
    case "Partly Cloudy (Day)":
      weatherIcon = "02d";
      break;
    default:
      weatherIcon = "02d";
      break;
  }

  const textSpan = "flex justify-center text-center";

  return (
    <div className="drop-shadow-md">
      <div className="flex items-center justify-center p-2 rounded-lg border drop-shadow-md text-primary h-48 w-48">
        <div className="flex flex-col">
          <div className={textSpan}>
            <img
              src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
              width={40}
              height={40}
              alt=""
            />
          </div>
          <span className={textSpan}>{selectedLocation}</span>
          <span className={textSpan}>{weather?.forecast}</span>
        </div>
      </div>
    </div>
  );
};
