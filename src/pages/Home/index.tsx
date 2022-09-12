import { useState, useEffect } from "react";
import axios from "axios";
import { DateComponent } from "../../components/DateComponent";
import { LocationComponent } from "../../components/LocationComponent";

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

  console.log(locationChange);

  return (
    <div className="page h-full">
      <div className="flex justify-center mt-8">
        <DateComponent
          onDateChange={[dateChange, setDateChange]}
          onTimeChange={[timeChange, setTimeChange]}
        />
      </div>
      <LocationComponent
        locations={locations}
        onLocationChange={[locationChange, setLocationChange]}
      />
    </div>
  );
};
