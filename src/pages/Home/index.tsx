import { useState, useEffect } from "react";
import axios from "axios";
import { DateComponent } from "../../components/DateComponent";
import { LocationComponent } from "../../components/LocationComponent";
import { WeatherComponent } from "../../components/WeatherComponent";

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

  useEffect(() => {
    let loc = timeChange.split(":");

    axios
      .get<Locations>(
        `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${dateChange}T${loc[0]}%3A${loc[1]}%3A${loc[2]}`
      )
      .then((response) => {
        setLocations(response.data);
      });
  }, [dateChange, timeChange]);

  return (
    <div className="page h-full">
      <div className="flex flex-col mt-8 gap-y-8">
        <div className="flex justify-center">
          <DateComponent
            onDateChange={[dateChange, setDateChange]}
            onTimeChange={[timeChange, setTimeChange]}
          />
        </div>

        <div className="flex justify-center">
          <div className="flex flex-row gap-x-4">
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
      </div>
    </div>
  );
};
