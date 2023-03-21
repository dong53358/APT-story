export const timeConversion = (timestamp) => {
  const offset = new Date().getTimezoneOffset(); // -540 (UTC+9:00의 오프셋)

  const date = new Date(
    timestamp.seconds * 1000 +
      timestamp.nanoseconds / 1000000 -
      offset * 60 * 1000
  );

  return (
    date.toISOString().slice(0, 10) + " " + date.toISOString().slice(11, 16)
  );
};
