export const DateComponent = ({
  onDateChange,
  onTimeChange,
}: {
  onDateChange: any;
  onTimeChange: any;
}) => {
  const handleDateChange = (e: any) => {
    onDateChange[1](e.target.value);
  };

  const handleTimeChange = (e: any) => {
    onTimeChange[1](e.target.value);
  };

  return (
    <div className="flex flex-row gap-4">
      <div>
        <input
          type="date"
          id="date"
          value={onDateChange[0]}
          max={new Date().toJSON()}
          onChange={(e) => handleDateChange(e)}
          className="p-2 rounded-lg border drop-shadow-md text-primary"
        />
      </div>

      <div>
        <input
          type="time"
          id="time"
          value={onTimeChange[0]}
          onChange={(e) => handleTimeChange(e)}
          className="p-2 rounded-lg border drop-shadow-md text-primary w-fit"
        />
      </div>
    </div>
  );
};
