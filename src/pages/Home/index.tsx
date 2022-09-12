import { useState } from "react";
import { DateComponent } from "../../components/DateComponent";

export const Home = () => {
  const [dateChange, setDateChange] = useState(
    new Date().toLocaleDateString("en-ca")
  );

  const [timeChange, setTimeChange] = useState(new Date().toLocaleTimeString());

  return (
    <div className="page h-full">
      <div className="flex justify-center mt-8">
        <DateComponent
          onDateChange={[dateChange, setDateChange]}
          onTimeChange={[timeChange, setTimeChange]}
        />
      </div>
    </div>
  );
};
