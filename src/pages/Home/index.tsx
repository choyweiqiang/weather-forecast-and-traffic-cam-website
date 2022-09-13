import { useState, useEffect } from "react";
import axios from "axios";
import { DateComponent } from "../../components/DateComponent";
import { LocationComponent } from "../../components/LocationComponent";
import { WeatherComponent } from "../../components/WeatherComponent";
import { TrafficComponent } from "../../components/TrafficComponent";

interface AreaMetaData {
  name: string;
  label_location: {
    latitude: number;
    longitude: number;
  };
}

interface Forecast {
  area: string;
  forecast: string;
}

interface Items {
  update_timestamp: string;
  timestamp: string;
  valid_period: {
    start: string;
    end: string;
  };
  forecasts: Forecast[];
}

interface Locations {
  area_metadata: AreaMetaData[];
  items: Items;
  api_info: { healthy: string };
}

export const Home = () => {
  const [dateChange, setDateChange] = useState(
    new Date().toLocaleDateString("en-ca")
  );
  const [timeChange, setTimeChange] = useState(new Date().toLocaleTimeString());
  const [locationChange, setLocationChange] = useState("");

  const [locations, setLocations] = useState({});
  const [trafficCamera, setTrafficCamera] = useState({});

  useEffect(() => {
    let loc = timeChange.split(":");

    axios
      .get<Locations>(
        `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${dateChange}T${loc[0]}%3A${loc[1]}%3A${loc[2]}`
      )
      .then((response) => {
        setLocations(response.data);
      });

    axios
      .get(
        `https://api.data.gov.sg/v1/transport/traffic-images?date_time=${dateChange}T${loc[0]}%3A${loc[1]}%3A${loc[2]}`
      )
      .then((response) => {
        setTrafficCamera(response.data);
      });
  }, [dateChange, timeChange]);

  const flexCenter = "flex justify-center";

  return (
    <div className="page h-full">
      <div className="flex flex-col mt-8 gap-y-4 md:gap-y-8">
        <div className={flexCenter}>
          <DateComponent
            onDateChange={[dateChange, setDateChange]}
            onTimeChange={[timeChange, setTimeChange]}
          />
        </div>

        <div className={flexCenter}>
          <div className="flex flex-col items-center md:flex-row gap-4">
            <LocationComponent
              locations={locations}
              onLocationChange={[locationChange, setLocationChange]}
            />
            <WeatherComponent
              selectedLocation={locationChange}
              locations={locations}
            />
          </div>
        </div>

        <div className={flexCenter}>
          <TrafficComponent
            selectedLocation={locationChange}
            locations={locations}
            trafficCamera={trafficCamera}
          />
        </div>
      </div>
    </div>
  );
};
