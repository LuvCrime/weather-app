export const addData = (
  name,
  temp,
  weather,
  tempMin,
  tempMax,
  lat,
  lon,
  icon
) => {
  return {
    type: "ADD_DATA",
    payload: {
      name,
      temp,
      weather,
      tempMin,
      tempMax,
      lat,
      lon,
      icon,
    },
  };
};

export const addDataDailyWeather = (week) => {
  return {
    type: "ADD_DATA_DAILY_WEATHER",
    payload: {
      week,
    },
  };
};
