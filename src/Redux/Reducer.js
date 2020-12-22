const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return {
        name: action.payload.name,
        temp: action.payload.temp,
        weather: action.payload.weather,
        tempMin: action.payload.tempMin,
        tempMax: action.payload.tempMax,
        lat: action.payload.lat,
        lon: action.payload.lon,
        icon: action.payload.icon,
      };
    case "ADD_DATA_DAILY_WEATHER":
      return {
        ...state,
        week: action.payload.week,
      };
    default:
      return state;
  }
};

export default reducer;
